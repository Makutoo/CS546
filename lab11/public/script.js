//const { get } = require("express/lib/response");

$( document ).ready(function() {
    var $showList = $('#showList')
    var $show = $('#show')
    $.ajax({
        type: 'Get',
        url: 'http://api.tvmaze.com/shows',
        success: function(shows) {
            $show.hide();
            $('#homeLink').hide();
            $.each(shows, function(i, show) {
                $showList.append(`<li><a class="link" id = ${i+1} href='${show._links.self.href}'>${show.name}</a></li>`)
            })
            $('.link').on('click', function (event) {
                event.preventDefault()
                var linkUrl = $(this).attr('href');
                $showList.hide()
                $show.empty()
                ClickLink(linkUrl)
                $('#homeLink').show();
            })
            $('#show').show();
        },
        error: function() {
            alert('error loading shows')
        }
    })

    $('#searchForm').submit(function (event) {
        event.preventDefault();
        $('#show').empty();
        $('#show').hide();
        var input = $('#search_term').val();
        console.log(input);
        var inputTrim = input.trim();
        console.log(inputTrim);
        var inputTrimLength = inputTrim.length;
        console.log(inputTrimLength);
        if(inputTrimLength == 0) {
            event.preventDefault();
            alert("You must provide a search term!");
        } else {
            $.ajax ({
                type: 'Get',
                url: "http://api.tvmaze.com/search/shows?q=" + $('#search_term').val(),
                success: function(shows) {
                    $('#homeLink').hide();
                    $('#showList').empty();
				    $('#showList').hide();
                    $.each(shows, function(i, show) {
                        $showList.append(`<li><a class="link" href='${show.show._links.self.href}'>${show.show.name}</a></li>`)
                    })
                    $('#showList').show();
				    $('#homeLink').show();
                    $('.link').on('click', function (event) {
                        event.preventDefault()
                        var linkUrl = $(this).attr('href');
                        $showList.hide()
                        $show.empty()
                        ClickLink(linkUrl)
                    })
                    $('#show').show();
                },
                error: function() {
                    alert('error loading shows')
                }
            })
        }
    })

    function ClickLink(linkUrl) {
        $.ajax({
            type: 'Get',
            url: linkUrl,
            success: function(show) {
                if(show.name) {
                    $show.append('<h1>', show.name)
                    $show.append("<br/>")
                }
                if(show.image && show.image.medium) {
                    var imgLink = show.image.medium
                    $show.append($('<img>',{id:'theImg',src: imgLink}))
                } else {
                    $show.append($('<img>',{id:'theImg',src: "/public/no_image.jpeg"})) 
                }

                const language = show.language ? show.language : "N/A"
                const network = show.network && show.network.name ? show.network.name : "N/A"
                const summary = show.summary ? show.summary : "N/A"
                const rating = show.rating && show.rating.average ? show.rating.average : "N/A"

                let genres = []
                if(show.genres.length != 0) {
                    for(var i = 0; i < show.genres.length; i++) {
                        genres.push(show.genres[i]);
                    }
                }
                $show.append($('<dl />').attr('id', 'detail'));
    
                var $genresList = $('<ul></ul>')

                for(let i = 0; i < genres.length; i++) {
                    var $genre = $(`<li>${genres[i]}</li>`)
                    $genresList.append($genre)
                }

                var $detail = $('#detail'); 
                $detail.append(`<dt> Language </dt>`);
                $detail.append(`<dd> ${language} </dd>`);
                $detail.append(`<dt> Genres </dt>`);
                
                $detail.append($genresList);

                $detail.append(`<dt> Average Rating </dt>`);
                $detail.append(`<dd> ${rating} </dd>`);
                $detail.append(`<dt> Network </dt>`);
                $detail.append(`<dd> ${network} </dd>`);
                $detail.append(`<dt> Summary </dt>`);
                $detail.append(`<dd> ${summary} </dd>`);
                
            },
            error: function() {
                alert('error loading show')
            }
        })
    }
    
});   