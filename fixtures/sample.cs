

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Hearth.Fixtures;

// Represents an incoming message.
public sealed record Message(
    Guid Id,
    string Content,
    MessagePriority Priority
);

public enum MessagePriority
{
    Low = 1,
    Normal = 2,
    High = 3
}

public interface IMessageProcessor<T>
{
    Task<bool> ProcessAsync(
        T message,
        CancellationToken cancellationToken = default);
}

public sealed class MessageProcessor :
    IMessageProcessor<Message>
{
    private const int MaxRetries = 3;
    private readonly List<Message> _history = new();

    public int ProcessedCount => _history.Count;

    public event EventHandler<Message>? MessageProcessed;

    public async Task<bool> ProcessAsync(
        Message message,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(message);

        if (string.IsNullOrWhiteSpace(message.Content))
        {
            throw new ArgumentException(
                "Message content cannot be empty.");
        }

        for (int attempt = 1; attempt <= MaxRetries; attempt++)
        {
            try
            {
                await Task.Delay(100, cancellationToken);

                _history.Add(message);

                MessageProcessed?.Invoke(this, message);

                Console.WriteLine(
                    $"Processed {message.Id}: {message.Content}");

                return true;
            }
            catch (OperationCanceledException)
            {
                throw;
            }
            catch (Exception ex) when (attempt < MaxRetries)
            {
                Console.Error.WriteLine(
                    $"Attempt {attempt} failed: {ex.Message}");
            }
        }

        return false;
    }

    public IEnumerable<Message> GetHighPriorityMessages()
    {
        return _history
            .Where(m => m.Priority == MessagePriority.High)
            .OrderBy(m => m.Content);
    }
}
