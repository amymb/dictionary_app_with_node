var app = angular.module('quoteDisplayFilter', [])


app.filter('revisedQuotesForDisplay', function() {
  return function(quote){
    if (!quote || !quote.length) { return; }
    var searchTerm = document.getElementById("searchTerm").value;
    var index;
    var array = quote.replace(/\n/g, " ").split(" ");
    var boldedWordInArray = array.map(function(value){
      if (value.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
        index = array.indexOf(value);
        return '<span class="super">' + value + '</span>'
      }else{
        return value
        };
    });
    if(boldedWordInArray.length >=50){
      var newQuote = quote;
      if (index >=25){
        var spliceAt = index - 25;
        var newQuoteBegin = boldedWordInArray.splice(spliceAt, 50);
        newQuoteBegin.unshift("...")
        newQuote = newQuoteBegin.join(" ") + "...";
      }else{
        newQuote = boldedWordInArray.splice(0, 50).join(" ") + "...";
      }
      return newQuote;
    }else{
    return boldedWordInArray.join(" ");
    }
  }
});

app.filter ('year', function(){
  return function(year){
    if (!year){
      return "unknown";
    } else if (year.length === 4) {
      return year;
    }else{
      var spliceAt = year.split("").indexOf("/") + 1;
      return year.split("").splice(spliceAt, 4).join("");
    };
  }
})



app.filter('votesNull', function(){
  return function(votes){
    if (!votes){
      return 0;
    }else{
      return votes;
    };
  };
});

app.filter('abbreviate', function(){
  return function(word){
    if(!word) return;
    if (word==="noun") return "n.";
    if (word ==="adjective") return "adj.";
    if (word ==="adverb") return "adv.";
    if(word==="verb") return "v.";
    if(word==="preposition") return "prep.";
    if(word==="pronoun") return "pro."
    if(word==="proper noun") return "pr.n."
  }
})

app.filter('popularQuotes', function(){
  return function(quote){
    var array = quote.replace(/\n/g, " ").split(" ");
    if(array.length < 30) return array.join(" ");
    return array.splice(0, 30).join(" ") + "...";
  }
})
