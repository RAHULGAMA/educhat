function validation(){
    if(document.Formfill.Username.value==""){
        document.getElementById("result").innerHTML="Enter Username*";
        return false;
    } 
    else if(document.Formfill.Username.value.length<6){
        document.getElementById("result").innerHTML="Enter full name*";
        return false;
    }
    else if(document.Formfill.Email.value==""){
        document.getElementById("result").innerHTML="Enter your Email*";
        return false;
    }
    else if(document.Formfill.Password.value==""){
        document.getElementById("result").innerHTML="Enter your password*";
        return false;
    }
    else if(document.Formfill.Password.value.length<6){
        document.getElementById("result").innerHTML="Password must be 6-digits long *";
        return false;
    }
    else if(document.Formfill.Cpassword.value==""){
        document.getElementById("result").innerHTML="Confirm password*";
        return false;
    }
    else if(document.Formfill.Cpassword.value!==document.Formfill.Password.value){
        document.getElementById("result").innerHTML="Password not matched*";
        return false;
    }
    else if(document.Formfill.Password.value == document.Formfill.Cpassword.value){
        popup.classList.add("open-slide")
        return false;
    }
}

var popup=document.getElementById('popup');
