$(document).ready(function(){
  $("#startLearnButton").click(function(){
    startLearn();
  });

  function showText1() {
    $("#message").text("さいしょは");
  }

  function showText2() {
    $("#message").text("グー！");
  }

  function showText3() {
    $("#message").text("じゃんけん");
  }

  function showText4() {
    $("#message").text("ほい！");
  }

  var isMeasuring = false;
  // Setup Leap loop with frame callback function
  var controllerOptions = {};
  var previousFrame = null;

  Leap.loop(controllerOptions, function(frame) {
    if (isMeasuring == false) {
      return;
    }

    leapData.push(frame);

    $("#infoString").html("Frame ID: " + frame.id  + "<br />"
      + "Timestamp: " + frame.timestamp + " &micro;s<br />"
      + "Hands: " + frame.hands.length + "<br />"
      + "Fingers: " + frame.fingers.length + "<br />")
  });

  function getData() {
    isMeasuring = true;
  }

  function finalizeData() {
    isMeasuring = false;
    dumpByJSON(leapData);
  }

  function startLearn(){
    // setTimeout は set したら次へ行く (async)
    // メッセージの表示
    setTimeout(showText1, 1000);
    setTimeout(showText2, 2000);
    setTimeout(showText3, 3000);
    setTimeout(showText4, 4000);
    // 学習用のデータの取得
    setTimeout(getData, 3000);
    setTimeout(finalizeData, 4000);
  }


  function dumpByJSON(obj) {
    const aElem = document.createElement('a');

    aElem.href = `data:application/x-json;base64,${btoa(JSON.stringify(obj))}`;
    aElem.download = 'dump.json';
    aElem.style.display = 'none';

    document.documentElement.appendChild(aElem);
    aElem.click();
  }

  const leapData = [];
});
