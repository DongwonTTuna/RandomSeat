document.getElementById("dm").addEventListener("change", (e) => {
    $('.student').html("");
    let d = e.target.value;
    for(i = 1; i <= d; i++) {
        str = i;
        if (i< 10){
            str = '0' + str;
        }
        $('.student').append("<label class='whitespace-nowrap'>学生 #"+ str+"  <input class='dark:bg-gray-900 dark:text-gray-50 rounded-lg my-2 mx-2' type='text' name='stuname[]'value='五十嵐嵐'></label>");
    }
    $('.rowcol').css('visibility', 'visible');
});

document.getElementById("row").addEventListener("change", make_exl);
document.getElementById("col").addEventListener("change", make_exl);

function make_exl(){
    let row = $('#row').find(":selected").text()
    let col = $('#col').find(":selected").text();
    let studentseat = 0;
    $('.exl').html('');
    $('.dddi').html('使わない席を選んでください。<br><br>');
    for(i = 1; i <= row; i++) {
        for(j = 1; j <= col; j++) {
            $('.exl').append("<input class='dark:bg-gray-900 dark:text-gray-50 rounded-lg my-2' type='checkbox' name='useless[]' value='" + studentseat + "' />");
            if(j%2 == 0){
                $('.exl').append("&emsp;")
            }
            studentseat++;
        }
        $('.exl').append("<br>");
    }
    $('.exl').append("<br>");
    for(i = 1; i <= col; i+=2) {
        $('.exl').append("&emsp;&emsp;前&emsp;&emsp;");
    }
}