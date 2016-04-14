// ==UserScript==
// @name          Open links as tfs issue with id
// @author        cyrS
// @description   Open http://tfs:8080/tfs/TekoraProjectsCollection/PFR2015/_workitems#id={selected text} on Ctrl+F1
// @version       1.0
// @include       https://maxdone.micromiles.co/*
// @include       *://tfs:*/*
// ==/UserScript==


function openTfsIssueInNewWindow(e) {
    if (e.ctrlKey){
        var issueId = e.target.ownerDocument.getSelection().toString();
        var tfsProjectName = 'PFR2015';
        var pathArray = window.location.pathname.split('/');
        var micromilesElem = $('#previewWrap')[0];

        if (pathArray[1] == 'tfs'){
            tfsProjectName = pathArray[3];
        }else if (typeof micromilesElem !== 'undefined'){
            var taskId = micromilesElem.getAttribute('taskid');
            var categoryElem = $('.taskTitle[taskid|="' + taskId + '"] ~ .task-row-lower > .project-label')[0];
            if (categoryElem.innerText == 'ГПН'){
                 tfsProjectName = 'ISUP_GPN';
            }
        }

        window.open('http://tfs:8080/tfs/TekoraProjectsCollection/' + tfsProjectName + '/_workitems#_a=edit&id=' + issueId, '_blank');
    }
}

function addListnersToIFrame(e){
    window.removeEventListener('blur', addListnersToIFrame, true);
    for (var counter = 0; counter < window.frames.length; counter++ ){
        window.frames[counter].document.addEventListener('dblclick', openTfsIssueInNewWindow);
    }
}

window.addEventListener('dblclick', openTfsIssueInNewWindow);
window.addEventListener('blur', addListnersToIFrame, true);
