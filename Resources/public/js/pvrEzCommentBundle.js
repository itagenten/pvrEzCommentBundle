$(document).ready(function () {
    var form = $('#commentForm');
    var formError = $('#formError');
    var formSuccess = $('#formSuccess');
    var submitButton = $('#commentForm input[name^=AddComment]');
    
    form.on('submit', function (evt) {
        formError.html('');
        formSuccess.html('');

        evt.preventDefault();
        
        $.ajax({
            url: form.attr("action"),
            type: 'post',
            dataType: 'html',
            data: form.serialize(),
            beforeSend: function () {
                submitButton.attr('disabled', true);
            },
            success: function (data) {
                formSuccess.html(data);
                form.remove();
            },
            error: function (response, status, err) {
                console.log(response);
                formError.html(err);
                $("a.captcha_reload").click();
                submitButton.attr('disabled', false);
            }
        });
        
    });
    
});

/*
YUI({
    base: '3.11.0/build/'
}).use("node", "io-base", "io-form", "json-parse", "node-event-simulate", function (Y) {
    var form = Y.one('#commentForm');
    var formError = Y.one('#formError');
    var formSuccess = Y.one('#formSuccess');
    var submitButton = Y.one('#commentForm input[name^=AddComment]');

    form.on('submit', function (evt) {
        formError.setHTML('');
        formSuccess.setHTML('');

        evt.preventDefault();
        Y.io(form.get("action"), {
            method: 'POST',
            form: {
                id: form,
                useDisabled: true
            },
            on: {
                start: function (id, args) {
                    submitButton.set('disabled', true);
                },
                success: function (id, response, args) {
                    var data = response.responseText;
                    formSuccess.setHTML( data );
                    form.remove();
                },
                failure: function(id, response, args ) {
                    data = Y.JSON.parse( response.responseText );
                    var error = "";

                    Y.Array.each( Object.keys(data), function( key ) {
                        error += data[key] + "<br />";
                    });
                    formError.setHTML( error );
                    Y.one("a.captcha_reload").simulate("click");
                    submitButton.set('disabled', false);
                }
            }
        });
    });

});
*/