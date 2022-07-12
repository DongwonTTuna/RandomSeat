let d;
let studentseat = 0;

function maketable(e){
    $('.student').html("");
    $('.inform').html("");
    if(typeof(e) !== "string"){
        d = (e.target).value;
    }else {
        d=e;
    }
    $('.inform').append("<div class='float-left p-2 font-bold rounded-lg border-2 border-indigo-800'><ul class='text-left'><li><h5>※&emsp;ダブルクリックで前の席に座らせます。</h5></li><li><h5>※&emsp;削除するにはダブルクリックが必要です。</h5></li></ul></div>");
    let strs = "<table class='table-fixed hue-rotate-15 border-separate border-spacing-2 border-spacing-y-4 mt-20'><tbody><tr>";
    for(i = 1; i <= d; i++) {
        let str = i;
        if (i< 10){
            str = '0' + str;
        }
        lcol = localStorage.getItem("tdinput"+i);
        if (lcol ===null){
            lcol = "";
            }
            strs += "<td ondblclick='dbck(event)' class='whitespace-nowrap shadow-md rounded-xl px-2 py-2 bg-gradient-to-br";
        prilcol = localStorage.getItem("pri"+i);
        if(prilcol=== null){
            strs+=" to-indigo-400 from-indigo-500 shadow-indigo-500 ";
        }else{
            strs += " to-red-400 from-red-500 shadow-red-400 ";
        }
        strs += " hover:shadow-inner transition-all duration-200 hover:ease-out hover:shadow-indigo-800 placeholder-gray-300''>学生 #"+ str+"<br><input id='tdinput"+i+"' class=' shadow-md bg-gray-800 text-gray-50 rounded-lg my-2 mx-2 text-center focus-within:placeholder-shown:placeholder-gray-800' type='text' name='";
        if (prilcol==null){
            strs+="stuname[]";
        }else{
            strs+="priority[]";
        }
        strs += "' placeholder='お名前'value='"+lcol+"'></td>";
        if((i % 5) === 0){
            strs +="</tr><tr>";
        }
    }
strs +="</tr></tbody></table>";

$('.student').append(strs);
    $('.rowcol').removeClass("hidden");
    $('.rowcol').addClass("visible");
}

function mkexl(row,col){
    if(isNaN(col) || col === null || isNaN(row) || row === null){
        return;
    }
    studentseat = 0;
    $('.exl').html('');
    $('.dddi').html('使わない席を選んでください。<br><br>');
    $('.exl').append("<div class='mx-auto rounded-lg bg-slate-600' style='width:"+col*1.5 +"%;'><h1>前</div><br>");
    let strs = '';
    for(i = 1; i <= row; i++) {
        strs+="<div>";
        for(j = 1; j <= col; j++) {
            lcol = localStorage.getItem("cb"+studentseat);
            if (lcol ===null){
                lcol = "";
            }
            strs +="<input class='m-auto bg-gray-900  text-gray-50 rounded-lg my-2' type='checkbox' id='cb"+studentseat+"' name='useless[]' value='"+studentseat+"' "+lcol+" />";
            if(j%2 === 0 && j<col){
                strs +="&emsp;";
            }
            studentseat++;
        }
        strs +="</div>";
    }
    $('.exl').append(strs);
}

let ldm = localStorage.getItem('dm');
if(ldm !== null){
    $("#dm").val(ldm);
    maketable(ldm);
}
var row1 = localStorage.getItem('row');
var col1 = localStorage.getItem('col');
if(row1 !== "" && col1 !== ""){
    $("#row").val(row1);
    $("#col").val(col1);
    mkexl(row1,col1);
}

document.getElementById("dm").addEventListener("change", (e) => maketable(e));

document.getElementById("row").addEventListener("change", make_exl);
document.getElementById("col").addEventListener("change", make_exl);

function make_exl(){
    let row = parseInt($('#row').find(":selected").text());
    let col = parseInt($('#col').find(":selected").text());
    mkexl(row,col);

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

function clearlocal(){
    localStorage.clear();
    location.reload();
    alert("全てが削除されました");
}
$('#formg').submit((e) => {
    localStorage.clear();
    var txt;
    d = $('#dm').val();    
    localStorage.setItem('dm',d);
    for(i = 1; i <= d; i++) {
        var tdinput = $('#tdinput'+i);
        if(tdinput.attr("name")=='priority[]'){
            localStorage.setItem('pri'+i,1);
        }else{
            localStorage.removeItem('pri'+i);
        }
        txt = tdinput.val();
        localStorage.setItem('tdinput'+i,txt);
    }
    txt = $('#row').val();
    localStorage.setItem('row',txt);
    txt = $('#col').val();
    localStorage.setItem('col',txt);
    to = $('#row').val() * $('#col').val();
    for(i=0; i<to;i++){
        var cb = $('#cb'+i);
        txt = cb.is(':checked');
        if(txt === true){
            localStorage.setItem('cb'+i,'checked');
        }
    }
});