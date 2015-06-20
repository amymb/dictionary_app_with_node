var app = angular.module('quoteDisplayFilter', [])


app.filter('revisedQuotesForDisplay', function() {
  return function(quote){
    if (!quote || !quote.length) { return; }
    var searchTerm = document.getElementById("searchTerm").value;
    var index;
    console.log(index)
    var array = quote.split(" ");
    var boldedWordInArray = array.map(function(value){
      if (value.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
        index = array.indexOf(value);
        return '<span class="super">' + value + '</span>'
      }else{
        return value
        };
    });
    if(boldedWordInArray.length >=60){
      var newQuote = quote;
      if (index >=30){
        var spliceAt = index - 30;
        var newQuoteBegin = boldedWordInArray.splice(spliceAt, 60);
        newQuoteBegin.unshift("...")
        newQuote = newQuoteBegin.join(" ") + "...";
      }else{
        newQuote = boldedWordInArray.splice(0, 60).join(" ") + "...";
      }
      return newQuote;
    }else{
    return boldedWordInArray.join(" ");
    }
  }
});
