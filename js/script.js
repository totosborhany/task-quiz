var istimeout = false;
let countdown; 
let time;     
let boardLocked = false;

const startminutes = 2;
document.querySelector("#intro button").onclick = function () {
     timer();
    
    document.querySelector("#intro").style.display = "none";
    document.querySelector("#thequestions").style.display = "block";
   
}

class Question{
    constructor(qid,qtitle,qop1,qop2,qop3,qans){
        this.qid=qid;
        this.qtitle=qtitle;
        this.qop1=qop1;
        this.qop2=qop2;
        this.qop3=qop3;
        this.qans=qans;
        
    }
}
var q1 = new Question("q1","What is HTML","Hyper Text Markup Language","Hyper Text Markdown Language","Hyper Text Markout Language","Hyper Text Markup Language");

var q2 = new Question("q2","What is CSS","Cascading Style Sheet","Cascading System Sheet","Cascading Scene Sheet","Cascading Style Sheet");

var q3 = new Question("q3","What is JS","Javascript","Java","JQuery","Javascript");

var q4 = new Question("q4","Which HTML tag is used to display a numbered list","ol","ul","list","ol");

var q5 = new Question("q5","Which word is used for comments in CSS","comment","note","remark","comment");

var q6 = new Question("q6","Which company developed JavaScript","Netscape","Microsoft","Oracle","Netscape");

var q7 = new Question("q7","Which attribute is used in img tag to display image","src","href","alt","src");

var q8 = new Question("q8","Which HTML tag is used to insert a line break","br","hr","break","br");

var q9 = new Question("q9","Which CSS property is used to change background color","background color","bgcolor","color background","background color");

var q10 = new Question("q10","Which CSS property is used to change text color","color","text color","font color","color");

var q11 = new Question("q11","Which tag is used to make text bold in HTML","b","bold","strong","b");

var q12 = new Question("q12","Which CSS property controls text size","font size","text size","size","font size");

var q13 = new Question("q13","In JavaScript which symbol is used for strict equality","===","==","=","===");

var q14 = new Question("q14","Which HTML tag is used for creating a table row","tr","td","th","tr");

var q15 = new Question("q15","Which CSS property is used to center text","text align","align","text center","text align");

var questionsdiv = document.getElementById("questions");

var fqlist = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15]; 
var questionsarr = [];
var usedIndexes = new Set();

for (let i = 0; i < 5; i++) {
    var j = Math.floor(Math.random() * 15);

    if (usedIndexes.has(j)) { 
        i--; 
        continue; 
    }

    usedIndexes.add(j);

    let copy = { ...fqlist[j] }; 
    copy.qid = "q" + (i + 1);
    questionsarr.push(copy);
}

var questionshtml="";
for(quest of questionsarr)
{

    questionsdiv.innerHTML+=`
        <div class="question">
            <h3>${quest.qid} :  ${quest.qtitle}</h3>
            <input type="radio" name="${quest.qid}" value="${quest.qop1}"> ${quest.qop1}
            <input type="radio" name="${quest.qid}" value="${quest.qop2}"> ${quest.qop2}
            <input type="radio" name="${quest.qid}" value="${quest.qop3}"> ${quest.qop3}
        </div>
    `;
}

document.forms["form1"].addEventListener("submit",function(event){
     event.preventDefault(); 

    calulateresult();

});
function calulateresult() {
        boardLocked = true;

    var score = 0;
    var skipped = 0;

    for (let quest of questionsarr) {
        var selected = document.querySelector(`input[name=${quest.qid}]:checked`);
        if (!selected) {
            skipped++;        
            continue;
        }
    }

    if (istimeout) {
        alert("Time is up");
    }

    if (skipped > 0 && !istimeout) {
        alert("Answer all please");
        document.forms["form1"].style.display = "block";
        return;
    }

    for (let quest of questionsarr) {
        var selected = document.querySelector(`input[name=${quest.qid}]:checked`);
        if (!selected) continue;

        if (selected.value == quest.qans) {
            score++;
            selected.style.accentColor = "green";
        } else {
            selected.style.accentColor = "red";
        }
    }

    var result = document.getElementById("result");
    result.classList.add("result");

    if (score >= questionsarr.length / 2) {
        result.innerHTML = `Congratulations, you scored ${score} out of ${questionsarr.length} questions`;
        result.style.color = "green";
    } else {
        result.innerHTML = `Try Again, you scored ${score} out of ${questionsarr.length} questions`;
        result.style.color = "red";
    }

    document.querySelector("#thequestions button").style.display = "none";
    clearInterval(countdown);
    document.querySelector("#intro").style.display = "none";
}


function timer() {
    time = startminutes * 60;

    countdown = setInterval(function () {
        let mins = Math.floor(time / 60);
        let sec = time % 60;

        if (sec < 10) sec = "0" + sec;
        if (mins < 10) mins = "0" + mins;

        document.querySelector("#thequestions h2").innerHTML = `Time : ${mins}:${sec}`;
        time--;

        if (time < 31) document.querySelector("#thequestions h2").style.color = "red";

        if (time < 0) {
                        istimeout = true;

            document.querySelector("#thequestions h2").innerHTML = "00:00";
            calulateresult(); 
        }
    }, 1000);
}