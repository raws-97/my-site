$("#send-wishes").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    const form = $(this);
    const actionUrl = "https://script.google.com/macros/s/AKfycbwDldxi74m_sRCOisLgaHlQkUI3TF7xT7ZW8e6f5P5awQdx_ehjBGtYbzutErT_dfNCtQ/exec?route=create-wish";
    let name = form.context.name.value
    let wish = form.context.wish.value
    if(name == ''){
        name = "Anonymous"
    }
    if(wish == ''){
        wish = "Wish you all the best guys."
    }
    
    disable_button()
    $.ajax({
        type: "POST",
        url: actionUrl,
        data: JSON.stringify(
            {
               "name": name,
               "wish": wish
            }
        ), // serializes the form's elements.
        success: function(data)
        {
          enable_button()
          get_wishes()
        }
    });
    
});

function disable_button(){
    const button = $("#submit-btn")
    button.prop("disabled", true)
    button.html("Submitting..")
}

function enable_button(){
    const button = $("#submit-btn")
    button.prop("disabled", false)
    button.html("Send")

    $("#send-wishes").trigger("reset")
}

get_wishes()
function get_wishes(){
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwDldxi74m_sRCOisLgaHlQkUI3TF7xT7ZW8e6f5P5awQdx_ehjBGtYbzutErT_dfNCtQ/exec?route=get-wishes",
        type: 'GET',
        dataType: 'json', // added data type
        success: function(res) {
            if(res.status){
                var html = ''

                res.data.forEach(item => {
                    html += '<div class="item">' +
                    '<div class="testimony-slide active text-center">' +
                    '<span>'+item.name+'</span>' +
                    '<blockquote>' +
                    '<p>"'+item.wish+'"</p>' +
                    '</blockquote>' +
                    '</div>' +
                    '</div>'
                })

                $("#wishes").html(html)

                destroy_owl()
                reinitalize_owl()
            }
        }
    });
}

function destroy_owl(){
    var owl = $('#wishes');
    owl.data('owlCarousel').destroy()
}

function reinitalize_owl(){
    var owl = $('#wishes');
    owl.owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        responsiveClass: true,
        nav: false,
        dots: true,
        smartSpeed: 200,
        autoHeight: true,
    });
}

$("#open").click(function(){
    $("#modal").hide()
    $("#page").show()
    $("#audio")[0].play()
})