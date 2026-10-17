package main

import (
	"context"
	"errors"
	"fmt"
	"sort"
	"strings"
	"sync"
	"time"
)

type Priority int

const (
	PriorityLow Priority = iota
	PriorityNormal
	PriorityHigh
)

// Message represents an incoming request.
type Message struct {
	ID        string
	Content   string
	Priority  Priority
	CreatedAt time.Time
}

type Processor[T any] interface {
	Process(ctx context.Context, item T) (bool, error)
}

type MessageProcessor struct {
	mu         sync.RWMutex
	history    map[string]Message
	maxRetries int
}

func NewMessageProcessor() *MessageProcessor {
	return &MessageProcessor{
		history:    make(map[string]Message),
		maxRetries: 3,
	}
}

func (p *MessageProcessor) Process(
	ctx context.Context,
	message Message,
) (bool, error) {
	if strings.TrimSpace(message.Content) == "" {
		return false, errors.New("message cannot be empty")
	}

	for attempt := 1; attempt <= p.maxRetries; attempt++ {
		select {
		case <-ctx.Done():
			return false, ctx.Err()
		case <-time.After(100 * time.Millisecond):
			p.mu.Lock()
			p.history[message.ID] = message
			p.mu.Unlock()

			fmt.Printf(
				"Processed %s: %s\n",
				message.ID,
				message.Content,
			)
			return true, nil
		}
	}

	return false, fmt.Errorf("maximum retries exceeded")
}

func (p *MessageProcessor) HighPriority() []Message {
	p.mu.RLock()
	defer p.mu.RUnlock()

	var result []Message

	for _, message := range p.history {
		if message.Priority == PriorityHigh {
			result = append(result, message)
		}
	}

	sort.Slice(result, func(i, j int) bool {
		return result[i].CreatedAt.Before(result[j].CreatedAt)
	})

	return result
}

func main() {
	processor := NewMessageProcessor()

	message := Message{
		ID:        "msg-42",
		Content:   "Hello from Hearth!",
		Priority:  PriorityHigh,
		CreatedAt: time.Now(),
	}

	ctx, cancel := context.WithTimeout(
		context.Background(),
		5*time.Second,
	)
	defer cancel()

	success, err := processor.Process(ctx, message)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Printf("Success: %t\n", success)
}
