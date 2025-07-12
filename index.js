let allSelect = document.querySelectorAll("select");
let timeEl = document.querySelector("h1");
let setBtn = document.querySelector("button");
let contentBox = document.querySelector(".content-box");
let alarmTime, isAlarmSet = false;
let ringtone = new Audio("./assets/ringtone.mp3")

for(let i = 24; i > 0; i --)
{
  i = i < 10 ? "0"+i : i
  let option = `<option value="${i}">${i}</option>`
  allSelect[0].innerHTML += option;
}
for(let i = 59; i >= 0; i --)
  {
    i = i < 10 ? "0"+i : i
    let option = `<option value="${i}">${i}</option>`
    allSelect[1].innerHTML += option;
  }
  for(let i = 2; i > 0; i--)
    {
      ampm = i == 1 ? "AM" : "PM"
      let option = `<option value="${ampm}">${ampm}</option>`
      allSelect[2].innerHTML += option;
    }
    setInterval(()=>{
      let date = new Date;
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      let ampm = "AM";
      if(h >=12)
      {
        ampm = "PM"
      }
      h = h == 0 ? h = 12 : h
      h = h < 10 ? "0"+h : h
      m = m < 10 ? "0"+m : m
      s = s < 10 ? "0"+s : s
      timeEl.innerHTML = `${h}:${m}:${s} ${ampm}`;
      if(alarmTime == `${h}:${m} ${ampm}`)
      {
        ringtone.play();
        ringtone.loop = true;
      }

    }, 1000)
    const setAlarm = ()=>{
      if(isAlarmSet)
      {
        alarmTime = "";
        ringtone.pause();
        contentBox.classList.remove("disabled")
        setBtn.innerText = "Set Alarm";
        return isAlarmSet = false;

      }
      isAlarmSet = true;
      let time = `${allSelect[0].value}:${allSelect[1].value} ${allSelect[2].value}`
      if(time.includes("Hour") || time.includes("Minutes") || time.includes("AM/PM"))
      {
        return swal("Warning", "please select a valid time", 'warning');
      }
      contentBox.classList.add("disabled");
      setBtn.innerText = "Clear Alarm"
      alarmTime = time;
    }
    setBtn.onclick = () =>{
      setAlarm()
    }
