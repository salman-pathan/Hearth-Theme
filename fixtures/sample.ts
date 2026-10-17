type MessagePriority = "low" | "normal" | "high";

interface Message {
  readonly id: string;
  content: string;
  priority: MessagePriority;
  createdAt: Date;
}

interface Processor<T, TResult> {
  process(item: T): Promise<TResult>;
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

/**
 * Processes messages with retry support.
 * @template T - Message type
 */
class MessageProcessor<T extends Message> implements Processor<T, boolean> {
  private readonly history = new Map<string, T>();
  private static readonly MAX_RETRIES = 3;

  get processedCount(): number {
    return this.history.size;
  }

  async process(message: T): Promise<boolean> {
    if (!message.content.trim()) {
      throw new ValidationError("Message cannot be empty");
    }

    for (let attempt = 1; attempt <= MessageProcessor.MAX_RETRIES; attempt++) {
      try {
        await new Promise<void>((resolve) => setTimeout(resolve, 100));

        this.history.set(message.id, message);

        console.log(`Processed ${message.id}: ${message.content}`);

        return true;
      } catch (error: unknown) {
        if (attempt === MessageProcessor.MAX_RETRIES) {
          throw error;
        }
      }
    }

    return false;
  }

  getHighPriorityMessages(): T[] {
    return [...this.history.values()]
      .filter((message) => message.priority === "high")
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}

const sampleMessage: Message = {
  id: crypto.randomUUID(),
  content: "Hello from Hearth!",
  priority: "high",
  createdAt: new Date(),
};

const processor = new MessageProcessor<Message>();

processor
  .process(sampleMessage)
  .then((success) => {
    console.log(`Success: ${success}`);
  })
  .catch((error: unknown) => {
    console.error(error);
  });
