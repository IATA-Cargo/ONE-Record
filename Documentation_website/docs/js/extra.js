if (document.getElementsByClassName("md-content").length == 1) {
    let keywords = [
        "MUST NOT",
        "MUST",
        "REQUIRED",
        "SHALL NOT",
        "SHALL",
        "SHOULD NOT",
        "SHOULD",
        "NOT RECOMMENDED",
        "RECOMMENDED",
        "MAY",
        "OPTIONAL"
    ]
    keywords.forEach(function (keyword, index) {
        var re = new RegExp(keyword, 'g');
        console.log(re);

        document.getElementsByClassName("md-content")[0].innerHTML =
            document.getElementsByClassName("md-content")[0].innerHTML.replace(re, "<span class=\"highlight\">" + keyword + "</span> ");
    });

}