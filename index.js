document.getElementById("dm").addEventListener("change", (e) => {
    $('.student').html("");
    $('.inform').html("");
    let d = (e.target).value;
    $('.inform').append("<div class='float-left p-2 font-bold rounded-lg border-2 border-indigo-800'><h5>※&emsp;ダブルクリックで前の席に座らせます。</h5></div>");
    let strs = "<table class='table-fixed hue-rotate-15 border-separate border-spacing-2 border-spacing-y-4 mt-20'><tbody><tr>";
    for(i = 1; i <= d; i++) {
        let str = i;
        if (i< 10){
            str = '0' + str;
        }
        strs += "<td ondblclick='dbck(event)' class='whitespace-nowrap shadow-md shadow-indigo-500 rounded-xl px-2 py-2 bg-gradient-to-br to-indigo-400 from-indigo-500 hover:shadow-inner transition-all duration-200 hover:ease-out hover:shadow-indigo-800'>学生 #"+ str+"<br><input class=' shadow-md dark:bg-gray-800 dark:text-gray-50 rounded-lg my-2 mx-2 text-center' type='text' name='stuname[]' value='"+i+"'></td>";
        if((i % 5) === 0){
            strs +="</tr><tr>";
        }
    }
strs +="</tr></tbody></table>";

$('.student').append(strs);
    $('.rowcol').removeClass("hidden");
    $('.rowcol').addClass("visible");
});

document.getElementById("row").addEventListener("change", make_exl);
document.getElementById("col").addEventListener("change", make_exl);

function make_exl(){
    let row = parseInt($('#row').find(":selected").text());
    let col = parseInt($('#col').find(":selected").text());
    let studentseat = 0;
    $('.exl').html('');
    $('.dddi').html('使わない席を選んでください。<br><br>');
    $('.exl').append("<div class='mx-auto rounded-lg bg-slate-600' style='width:"+col*1.5 +"%;'><h1>前</div><br>");
    let strs = '';
    for(i = 1; i <= row; i++) {
        let a = 0;
        strs+="<div>";
        for(j = 1; j <= col; j++) {
            strs +="<input class='m-auto dark:bg-gray-900  dark:text-gray-50 rounded-lg my-2' type='checkbox' name='useless[]' value='" + studentseat + "' />";
            if(j%2 === 0){
                if(j=== col){
                    a = 1;
                    studentseat++;
                    continue;
                }
                strs +="&emsp;";
            }
            studentseat++;
        }
        strs +="</div>";
    }
    $('.exl').append(strs);
}

function dbck(e) {
    if (e.target.classList.contains("to-indigo-400")){
        $(e.target).removeClass("to-indigo-400");
        $(e.target).removeClass("from-indigo-500");
        $(e.target).addClass("from-red-500");
        $(e.target).addClass("to-red-400");
        $(e.target.querySelector('input')).attr('name','priority[]');
    } else{
        $(e.target).removeClass("from-red-500");
        $(e.target).removeClass("to-red-400");
        $(e.target).addClass("to-indigo-400");
        $(e.target).addClass("from-indigo-500");
        $(e.target.querySelector('input')).attr('name','stuname[]');
    }

}