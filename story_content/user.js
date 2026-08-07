window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
var getKeyDown = player.getKeyDown;
var keydown = player.keydown;
var keyup = player.keyup;
window.Script1 = function()
{
  (function () {
  var player = GetPlayer();
  window.parent.postMessage({
    source: 'streamloop-simulation',
    type: 'scenario_start',
    payload: { timestamp: new Date().toISOString() }
  }, 'https://stephaniecedergren.com');
})();
}

window.Script2 = function()
{
  window.STREAMLOOP_XAPI = window.STREAMLOOP_XAPI || {
endpoint: "https://stephanie-sandbox.lrs.io/xapi/statements",
authHeader: "Basic MGRjNzRmNGQtNjg4OS00YjNhLWJmMGQtZDI4YzZkYjU4NzQwOmRlZDA2YjQ1LWEyNDgtNGZkMi1hYTdmLTM5MmQ5YWE4MDg4NQ==",
  namespace: "https://stephaniecedergren.com/xapi/streamloop-simulation/"
};

window.STREAMLOOP_XAPI.scenarioStart = Date.now();

window.sendStreamLoopStatement = function (objectId, verbId, verbDisplay, scoreRaw, extensions) {
  var learnerName = player.GetVar("LearnerName") || "Anonymous Learner";
  var learnerEmail = player.GetVar("LearnerEmail") || "rep@streamloop.com";

  var statement = {
    actor: { name: learnerName, mbox: "mailto:" + learnerEmail },
    verb: { id: verbId, display: { "en-US": verbDisplay } },
    object: {
      id: window.STREAMLOOP_XAPI.namespace + objectId,
      definition: { name: { "en-US": objectId.replace(/_/g, " ") } }
    },
    result: { score: { raw: scoreRaw, min: 0, max: 100 } },
    context: { extensions: extensions || {} }
  };

  fetch(window.STREAMLOOP_XAPI.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": window.STREAMLOOP_XAPI.authHeader,
      "X-Experience-API-Version": "1.0.3"
    },
    body: JSON.stringify(statement)
  }).catch(function (err) { console.error("xAPI send failed:", err); });

  window.parent.postMessage({ type: "streamloop-xapi-statement", statement: statement }, "*");
};
}

window.Script3 = function()
{
  window.sendStreamLoopStatement(
  "Path_A_Defensive_Script",
  "https://stephaniecedergren.com/xapi/verbs/selected",
  "selected",
  0,
  {
    "https://stephaniecedergren.com/xapi/extensions/call-driver": "price-and-technical",
    "https://stephaniecedergren.com/xapi/extensions/behavior-type": "Defensive / Policy Response"
  }
);
}

window.Script4 = function()
{
  (function () {
  window.parent.postMessage({
    source: 'streamloop-simulation',
    type: 'xapi_statement_sent',
    payload: {
      verb: 'selected',
      activity: 'Path_A_Defensive_Script',
      timestamp: new Date().toISOString()
    }
  }, 'https://stephaniecedergren.com');
})();
}

window.Script5 = function()
{
  (function () {
  var player = GetPlayer();
  window.parent.postMessage({
    source: 'streamloop-simulation',
    type: 'decision_1',
    payload: {
      choice: player.GetVar('PathChosen'),
      score: player.GetVar('EmpathyScore'),
      timestamp: new Date().toISOString()
    }
  }, 'https://stephaniecedergren.com');
})();
}

window.Script6 = function()
{
  window.sendStreamLoopStatement(
  "Path_B_Discount_BandAid",
  "https://stephaniecedergren.com/xapi/verbs/selected",
  "selected",
  50,
  {
    "https://stephaniecedergren.com/xapi/extensions/call-driver": "price-and-technical",
    "https://stephaniecedergren.com/xapi/extensions/behavior-type": "Transactional Discount"
  }
);
}

window.Script7 = function()
{
  (function () {
  window.parent.postMessage({
    source: 'streamloop-simulation',
    type: 'xapi_statement_sent',
    payload: {
      verb: 'selected',
      activity: 'Path_B_Discount_BandAid',
      timestamp: new Date().toISOString()
    }
  }, 'https://stephaniecedergren.com');
})();
}

window.Script8 = function()
{
  (function () {
  var player = GetPlayer();
  window.parent.postMessage({
    source: 'streamloop-simulation',
    type: 'decision_1',
    payload: {
      choice: player.GetVar('PathChosen'),
      score: player.GetVar('EmpathyScore'),
      timestamp: new Date().toISOString()
    }
  }, 'https://stephaniecedergren.com');
})();
}

window.Script9 = function()
{
  window.sendStreamLoopStatement(
  "Path_C_PAN_Response",
  "https://stephaniecedergren.com/xapi/verbs/selected",
  "selected",
  100,
  {
    "https://stephaniecedergren.com/xapi/extensions/call-driver": "price-and-technical",
    "https://stephaniecedergren.com/xapi/extensions/behavior-type": "P.A.N. Active Listening"
  }
);
}

window.Script10 = function()
{
  (function () {
  window.parent.postMessage({
    source: 'streamloop-simulation',
    type: 'xapi_statement_sent',
    payload: {
      verb: 'selected',
      activity: 'Path_C_PAN_Response',
      timestamp: new Date().toISOString()
    }
  }, 'https://stephaniecedergren.com');
})();
}

window.Script11 = function()
{
  (function () {
  var player = GetPlayer();
  window.parent.postMessage({
    source: 'streamloop-simulation',
    type: 'decision_1',
    payload: {
      choice: player.GetVar('PathChosen'),
      score: player.GetVar('EmpathyScore'),
      timestamp: new Date().toISOString()
    }
  }, 'https://stephaniecedergren.com');
})();
}

window.Script12 = function()
{
  var elapsed = Math.round((Date.now() - window.STREAMLOOP_XAPI.scenarioStart) / 1000);
player.SetVar("ScenarioTimeSeconds", elapsed);
}

window.Script13 = function()
{
  var elapsed = Math.round((Date.now() - window.STREAMLOOP_XAPI.scenarioStart) / 1000);
player.SetVar("ScenarioTimeSeconds", elapsed);
}

window.Script14 = function()
{
  window.sendStreamLoopStatement(
  "Path_C_RootCause_Technical",
  "https://stephaniecedergren.com/xapi/verbs/selected",
  "selected",
  100,
  {
    "https://stephaniecedergren.com/xapi/extensions/call-driver": "price-and-technical",
    "https://stephaniecedergren.com/xapi/extensions/behavior-type": "Root Cause Fix: Technical"
  }
);
}

window.Script15 = function()
{
  (function () {
  window.parent.postMessage({
    source: 'streamloop-simulation',
    type: 'xapi_statement_sent',
    payload: {
      verb: 'selected',
      activity: 'Path_C_RootCause_Technical',
      timestamp: new Date().toISOString()
    }
  }, 'https://stephaniecedergren.com');
})();
}

window.Script16 = function()
{
  (function () {
  var player = GetPlayer();
  window.parent.postMessage({
    source: 'streamloop-simulation',
    type: 'decision_2',
    payload: {
      choice: player.GetVar('RootCausePath'),
      score: player.GetVar('RootCauseScore'),
      timestamp: new Date().toISOString()
    }
  }, 'https://stephaniecedergren.com');
})();
}

window.Script17 = function()
{
  window.sendStreamLoopStatement(
  "Path_C_RootCause_Price",
  "https://stephaniecedergren.com/xapi/verbs/selected",
  "selected",
  50,
  {
    "https://stephaniecedergren.com/xapi/extensions/call-driver": "price-and-technical",
    "https://stephaniecedergren.com/xapi/extensions/behavior-type": "Root Cause Fix: Price Discount"
  }
);
}

window.Script18 = function()
{
  (function () {
  window.parent.postMessage({
    source: 'streamloop-simulation',
    type: 'xapi_statement_sent',
    payload: {
      verb: 'selected',
      activity: 'Path_C_RootCause_Price',
      timestamp: new Date().toISOString()
    }
  }, 'https://stephaniecedergren.com');
})();
}

window.Script19 = function()
{
  (function () {
  var player = GetPlayer();
  window.parent.postMessage({
    source: 'streamloop-simulation',
    type: 'decision_2',
    payload: {
      choice: player.GetVar('RootCausePath'),
      score: player.GetVar('RootCauseScore'),
      timestamp: new Date().toISOString()
    }
  }, 'https://stephaniecedergren.com');
})();
}

window.Script20 = function()
{
  window.sendStreamLoopStatement(
  "Path_C_RootCause_Competitor",
  "https://stephaniecedergren.com/xapi/verbs/selected",
  "selected",
  0,
  {
    "https://stephaniecedergren.com/xapi/extensions/call-driver": "price-and-technical",
    "https://stephaniecedergren.com/xapi/extensions/behavior-type": "Root Cause Fix: Competitor Perk"
  }
);
}

window.Script21 = function()
{
  (function () {
  window.parent.postMessage({
    source: 'streamloop-simulation',
    type: 'xapi_statement_sent',
    payload: {
      verb: 'selected',
      activity: 'Path_C_RootCause_Competitor',
      timestamp: new Date().toISOString()
    }
  }, 'https://stephaniecedergren.com');
})();
}

window.Script22 = function()
{
  (function () {
  var player = GetPlayer();
  window.parent.postMessage({
    source: 'streamloop-simulation',
    type: 'decision_2',
    payload: {
      choice: player.GetVar('RootCausePath'),
      score: player.GetVar('RootCauseScore'),
      timestamp: new Date().toISOString()
    }
  }, 'https://stephaniecedergren.com');
})();
}

window.Script23 = function()
{
  var elapsed = Math.round((Date.now() - window.STREAMLOOP_XAPI.scenarioStart) / 1000);
player.SetVar("ScenarioTimeSeconds", elapsed);
}

window.Script24 = function()
{
  var elapsed = Math.round((Date.now() - window.STREAMLOOP_XAPI.scenarioStart) / 1000);
player.SetVar("ScenarioTimeSeconds", elapsed);
}

window.Script25 = function()
{
  var elapsed = Math.round((Date.now() - window.STREAMLOOP_XAPI.scenarioStart) / 1000);
player.SetVar("ScenarioTimeSeconds", elapsed);
}

window.Script26 = function()
{
  var learnerName = player.GetVar("LearnerName") || "Anonymous Learner";
var learnerEmail = player.GetVar("LearnerEmail") || "rep@streamloop.com";
var pathChosen = player.GetVar("PathChosen");
var empathyScore = player.GetVar("EmpathyScore");
var rootCausePath = player.GetVar("RootCausePath") || "n/a";
var rootCauseScore = player.GetVar("RootCauseScore");
var outcomeStatus = player.GetVar("OutcomeStatus");
var scenarioTimeSeconds = player.GetVar("ScenarioTimeSeconds");

var finalScore = (rootCausePath !== "n/a") ? rootCauseScore : empathyScore;

var statement = {
  actor: {
    name: learnerName,
    mbox: "mailto:" + learnerEmail
  },
  verb: {
    id: "http://adlnet.gov/expapi/verbs/completed",
    display: { "en-US": "completed" }
  },
  object: {
    id: window.STREAMLOOP_XAPI.namespace + "StreamLoop_Retention_Simulation",
    definition: {
      name: { "en-US": "StreamLoop Retention Simulation" }
    }
  },
  result: {
    completion: true,
    score: { raw: finalScore, min: 0, max: 100 },
    duration: "PT" + scenarioTimeSeconds + "S"
  },
  context: {
    extensions: {
      "https://stephaniecedergren.com/xapi/extensions/path-chosen": pathChosen,
      "https://stephaniecedergren.com/xapi/extensions/root-cause-path": rootCausePath,
      "https://stephaniecedergren.com/xapi/extensions/outcome-status": outcomeStatus,
      "https://stephaniecedergren.com/xapi/extensions/scenario-time-seconds": scenarioTimeSeconds
    }
  }
};

fetch(window.STREAMLOOP_XAPI.endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": window.STREAMLOOP_XAPI.authHeader,
    "X-Experience-API-Version": "1.0.3"
  },
  body: JSON.stringify(statement)
}).catch(function (err) { console.error("xAPI completion send failed:", err); });

window.parent.postMessage({ type: "streamloop-xapi-statement", statement: statement }, "*");
}

window.Script27 = function()
{
  (function () {
  var player = GetPlayer();
  window.parent.postMessage({
    source: 'streamloop-simulation',
    type: 'scenario_complete',
    payload: {
      pathChosen: player.GetVar('PathChosen'),
      rootCausePath: player.GetVar('RootCausePath'),
      empathyScore: player.GetVar('EmpathyScore'),
      rootCauseScore: player.GetVar('RootCauseScore'),
      timestamp: new Date().toISOString()
    }
  }, 'https://stephaniecedergren.com');
})();
}

};
