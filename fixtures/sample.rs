use std::collections::HashMap;
use std::error::Error;
use std::fmt;

// Represents the priority of a message.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Priority {
    Low,
    Normal,
    High,
}

#[derive(Debug, Clone)]
struct Message {
    id: u64,
    content: String,
    priority: Priority,
}

trait Processor<T> {
    type Error;

    fn process(&mut self, item: T) -> Result<bool, Self::Error>;
}

#[derive(Debug)]
struct ProcessingError(String);

impl fmt::Display for ProcessingError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Processing error: {}", self.0)
    }
}

impl Error for ProcessingError {}

struct MessageProcessor {
    history: HashMap<u64, Message>,
    max_retries: usize,
}

impl MessageProcessor {
    const DEFAULT_RETRIES: usize = 3;

    fn new() -> Self {
        Self {
            history: HashMap::new(),
            max_retries: Self::DEFAULT_RETRIES,
        }
    }

    fn high_priority(&self) -> Vec<&Message> {
        self.history
            .values()
            .filter(|message| message.priority == Priority::High)
            .collect()
    }
}

impl Processor<Message> for MessageProcessor {
    type Error = ProcessingError;

    fn process(&mut self, message: Message) -> Result<bool, Self::Error> {
        if message.content.trim().is_empty() {
            return Err(ProcessingError("Message cannot be empty".to_string()));
        }

        println!("Processing message {}: {}", message.id, message.content);

        self.history.insert(message.id, message);

        Ok(true)
    }
}

fn main() -> Result<(), Box<dyn Error>> {
    let mut processor = MessageProcessor::new();

    let message = Message {
        id: 42,
        content: String::from("Hello from Hearth!"),
        priority: Priority::High,
    };

    processor.process(message)?;

    for item in processor.high_priority() {
        println!("{:?}", item);
    }

    Ok(())
}
