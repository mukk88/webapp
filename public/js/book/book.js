$(document).ready(function() {
    var editmode = false;

    $('button').css('left', ($('#main').position().left - 100) + 'px');
    $('#overlay').draggable();

    $('#read').click(function(){
        editmode = false;
        $('p').each(function(index){
            var text = $(this).text().replace(/edit/g,'');
            $(this).html(text);

        });
    });


    function createEntry(current, index){
        $('#overlay').show();
        $('#insert').unbind();
        $('#new').val('');
        $('#insert').click(function(){
            $('#overlay').hide();
            var text = $('#new').val();
            current.after('<br><br> ' + text);
        });
    };

    $('#edit').click(function(){
        if(!editmode){
            editmode = true;
            $('p').each(function(index){
                var text = $(this).text().replace(/\./g,'.<button class= "editbutton" style="float:right">edit</button><br><br>');
                $(this).html(text);
            });
            $('.editbutton').each(function(index){
                $(this).attr('id', 'edit'+ index);
                $(this).click(function(){
                    createEntry($(this), index);
                });
            });
        }

    });

});