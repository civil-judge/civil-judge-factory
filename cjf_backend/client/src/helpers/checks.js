import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function isEmpty(txt) {
  if (txt.length === 0) {
    return true;
  } else {
    return false;
  }
}

function isAlphabets(txt) {
  if (/^[a-z A-Z]+/.test(txt)) {
    return true;
  } else {
    return false;
  }
}

function isDigits(txt) {
  if (/^[0-9]+/.test(txt)) {
    return false;
  } else {
    return true;
  }
}

function isMobile(txt) {
  if (/^[0-9]{10}/.test(txt)) {
    return true;
  } else {
    return false;
  }
}

function isEmail(txt) {
  if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(txt)) {
    return true;
  } else {
    return false;
  }
}

function checkEmail(txt) {
  if (checkRequire(txt)) {
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (reg.test(txt) == false) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

function errorMessage(message, time) {
  return toast.error(`${message}`, {
    position: "top-right",
    autoClose: time || 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

function successMessage(message) {
    return toast.success(`${message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

function checkRequire(txt) {
  if (txt.length == 0 || txt.indexOf(" ") == 0) {
    return false;
  } else {
    return true;
  }
}

function checkPassword(txt) {
  if (txt.length <= 5) return false;
  else return true;
}

function checkUserPassword(txt) {
  var reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  // var reg = /^(?=[a-zA-Z])(?=.*[0-9])(?=.*[#\$_])(?=.*[A-Z])(?=.*[a-z])(?!.*[^a-zA-Z0-9#\$_])(?!.*\s).{8,20}$/
  if (reg.test(txt) == false) return false;
  else return true;
}

function checkPin(txt) {
  var reg = /^[0-9]{6}$/;
  //Alert.alert('cc '+reg.test(txt))
  if (reg.test(txt) == false) return false;
  else return true;
}

function checkMobile(txt) {
  var reg = /^[0-9]{10}$/;
  //Alert.alert('cc '+reg.test(txt))
  if (reg.test(txt) == false) return false;
  else return true;
}

function checkPhone(txt) {
  var reg = /^[0-9]+$/;
  //Alert.alert('cc '+reg.test(txt))
  if (reg.test(txt) == false) return false;
  else return true;
}

function checkGst(txt) {
  var reg = /[a-zA-Z0-9]{15}/;
  //Alert.alert('cc '+reg.test(txt))
  if (reg.test(txt) == false) return false;
  else return true;
}

export {
  isEmpty,
  isAlphabets,
  isEmail,
  isMobile,
  isDigits,
  errorMessage,
  successMessage,
  checkEmail,
  checkRequire,
  checkUserPassword
};
