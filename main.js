var quotes = [
  'Don\'t let the noise of others opinions drown out your own inner voice. ― Steve Jobs',
  'Your time is limited, so don’t waste it living someone else’s life. ― Steve Jobs',
  'I can’t relate to lazy people. We don’t speak the same language. I don’t understand you. I don’t want to understand you. -Kobe Bryant',
  'If you’re afraid to fail, then you’re probably going to fail. -Kobe Bryant',
  'I don\'t stop when I\'m tired. I stop when I\'m done. - David Goggins.',
  'From the time you take your first breath, you become eligible to die. You also become eligible to find your greatness and become the one warrior. -David Goggins',
]

function newQuote() {
  var randomNumber = Math.floor(Math.random() * (quotes.length));
  document.getElementById('quoteDisplay').innerHTML = quotes[randomNumber];
}
