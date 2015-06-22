var app = angular.module('quoteDisplayFilter', [])


app.filter('revisedQuotesForDisplay', function() {
  return function(quote){
    if (!quote || !quote.length) { return; }
    var searchTerm = document.getElementById("searchTerm").value;
    var index;
    var array = quote.split(" ");
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
