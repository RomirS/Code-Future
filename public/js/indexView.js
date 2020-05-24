// $(function() {
//     var form = $('#signup');
//     var formMessages = $('#formMessages');

//     $(form).submit(e => {
//         e.preventDefault();
    
//         var formData = $(form).serialize();
//         $.ajax({
//             type: 'POST',
//             url: $(form).attr('action'),
//             data: formData
//         }).done(response => {
//             $(formMessages).removeClass('error');
//             $(formMessages).addClass('success');
        
//             $(formMessages).text(response);
        
//             $('#first').val('');
//             $('#last').val('');
//             $('#actnum').val('');
//             $('#date').val('');
//         }).fail(data => {
//             $(formMessages).removeClass('success');
//             $(formMessages).addClass('error');
        
//             if (data.responseText !== '') {
//                 $(formMessages).text(data.responseText);
//             } else {
//                 $(formMessages).text('Oops! An error occured when submitting.');
//             }
//         });
//     });
// });