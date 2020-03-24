import { Component } from '@angular/core';

import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
import {
  Diagram, NodeModel, DataBinding, DiagramTools,
  ComplexHierarchicalTree, LayoutOrientation, ConnectorModel, IDragOverEventArgs, IClickEventArgs, IHistoryChangeArgs, IDoubleClickEventArgs,
  ITextEditEventArgs, IScrollChangeEventArgs, ISelectionChangeEventArgs, ISizeChangeEventArgs,
  IConnectionChangeEventArgs, IEndChangeEventArgs, IPropertyChangeEventArgs, IDraggingEventArgs, IRotationEventArgs,
  ICollectionChangeEventArgs, randomId,ZoomTypes,
  IMouseEventArgs, DiagramContextMenu, Snapping, SnapConstraints,
  NodeConstraints, BpmnDiagrams, DiagramConstraints
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { NumericTextBox, ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';
import * as Data from './diagram-data.json';
import {
  NodeAnimationSettings
} from '@syncfusion/ej2-navigations';

Diagram.Inject(DiagramContextMenu, Snapping, BpmnDiagrams);
Diagram.Inject(DataBinding, ComplexHierarchicalTree);

export interface DataInfo {
  [key: string]: string;
}

declare var $: any;

var self;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})


export class AppComponent  {
  name = 'Angular';
  
tt:any  = [
  {"name":"node66","fillColor":"#e7704c","reprotingPerson":[""],"cp":"ABC"},
  {"name":"node443","fillColor":"#e7704c","reprotingPerson":[""],"cp":"ABC"},
  {"name":"node572","fillColor":"#e7704c","reprotingPerson":[""],"cp":"ABC"},
  {"name":"node55","fillColor":"#e7704c","reprotingPerson":[""],"cp":"ABC"},
  {"name":"node11","fillColor":"#f3904a","reprotingPerson":["node572"],"cp":"ABC"},
  {"name":"node61","fillColor":"#f3904a","reprotingPerson":["node572"],"cp":"ABC"},
  {"name":"node444","fillColor":"#f3904a","reprotingPerson":["node443"],"cp":"ABC"},
  {"name":"node723","fillColor":"#f3904a","reprotingPerson":["node66"],"cp":"ABC"},
  {"name":"node819","fillColor":"#f3904a","reprotingPerson":["node55","node11","node444"],"cp":"ABC"},
  {"name":"node32","fillColor":"#efd46e","reprotingPerson":["node819"],"cp":"ABC"},
  {"name":"node41","fillColor":"#efd46e","reprotingPerson":["node819","node234"],"cp":"ABC"},
  {"name":"node108","fillColor":"#efd46e","reprotingPerson":["node819"],"cp":"ABC"},
  {"name":"node109","fillColor":"#efd46e","reprotingPerson":["node819"],"cp":"ABC"},
  {"name":"node244","fillColor":"#efd46e","reprotingPerson":["node819"],"cp":"ABC"},
  {"name":"node46","fillColor":"#efd46e","reprotingPerson":["node723"],"cp":"ABC"},
  {"name":"node234","fillColor":"#efd46e","reprotingPerson":["node723"],"cp":"ABC"},
  {"name":"node18","fillColor":"#58b087","reprotingPerson":["node234"],"cp":"ABC"},
  {"name":"node283","fillColor":"#58b087","reprotingPerson":["node234"],"cp":"ABC"},
  {"name":"node332","fillColor":"#58b087","reprotingPerson":["node234"],"cp":"ABC"},
  {"name":"node412","fillColor":"#58b087","reprotingPerson":["node234"],"cp":"ABC"},
  {"name":"node414","fillColor":"#58b087","reprotingPerson":["node234"],"cp":"ABC"},
  {"na,me":"node277","fillColor":"#58b087","reprotingPerson":["node244"],"cp":"ABC"},
  
  {"name":"node606","fillColor":"#58b087","reprotingPerson":["node41"],"cp":"ABC"},
  {"name":"node33","fillColor":"#58b087","reprotingPerson":["node32"],"cp":"ABC"},
  {"name":"node21","fillColor":"#58b087","reprotingPerson":["node32"],"cp":"ABC"}
  ]




GetsyncfusionData(){
  var _this = this;
  console.log(_this.tt)
function doubleClick(args:IDoubleClickEventArgs): void {
   console.log("---Double Clicked.----")
  // console.log(args)
}
function click(args) {
   console.log("--Click function--")
  //console.log(args.element.data.Name)
}

function scrollChange(args) {
  // console.log("--scroll function--")
  //   console.log(args)
  //console.log(args.element.data.Name)
}

function mouseLeave(args) {
  // console.log("--scroll function--")
  //   console.log(args)
  console.log('Mouse Leave Event Fired')
}


function getcontent(): HTMLElement {
  var tooltipContent: HTMLElement = document.createElement('div');
  tooltipContent.innerHTML =
    '<div style="border-width:1px;"><span> Tooltip !!! </span> </div>';
  return tooltipContent;
}


let diagram: Diagram = new Diagram({
  width: '100%', height: 580,
  tool: DiagramTools.ZoomPan,
  snapSettings: { constraints: SnapConstraints.None },
  doubleClick: doubleClick,
  //scrollChange:scrollChange,
  click: click,
  mouseLeave:mouseLeave,
  //   Configures data source

  dataSourceSettings: {
    id: 'name', parentId: 'reprotingPerson',
    dataManager: new DataManager(_this.tt),
    //binds the external data with node
    doBinding: (nodeModel: NodeModel, data: DataInfo, diagram: Diagram) => {
      /* tslint:disable:no-string-literal */
      nodeModel.style = { fill: data['fillColor'], strokeWidth: 1, strokeColor: data['border'], };
      nodeModel.annotations = [{
        content: data.cp
        , offset: { x: 0.5, y: 1.1 }, verticalAlignment :'Top',horizontalAlignment :'Center',
        style:{
          textWrapping:'Wrap',
        }

      }];
      var treee =  data.cp=="tre"?false:true
      nodeModel.visible = treee
    }
  },
  //Disables all interactions except zoom/pan 

  constraints: DiagramConstraints.Default | DiagramConstraints.Tooltip,

  tooltip: {
    position: 'TopCenter', relativeMode: 'Object',
    animation: { open: { effect: 'FadeZoomIn', delay: 100 }, close: { effect: 'FadeZoomOut', delay: 100 } },

  },


  //Configrues hierarchical tree layout
  layout: {
    type: 'ComplexHierarchicalTree',
    horizontalSpacing: 40, verticalSpacing: 50, orientation: 'TopToBottom',
    margin: { left: 10, right: 0, top: 50, bottom: 0 }
  },

  //Sets the default values of nodes
  getNodeDefaults: function (obj) {
    obj.width = 70;
    obj.height = 40;
    if(obj.data.Name=="node41"){
    obj.shape = { type: 'Basic', shape: 'Ellipse' , cornerRadius: 7 };  
    }
    else{
    obj.shape = { type: 'Basic', shape: 'Rectangle' , cornerRadius: 7 };
    }
    obj.constraints = NodeConstraints.Default | NodeConstraints.Tooltip
    //set an tooltip content for each node
    obj.tooltip.content = 
"<div style='margin:auto; width:220px; height:100%; padding: 10px; background-color: #eef0e6;'>" +
                        "<h3 style='font-weight: 300; font-size: 21px; color: black; padding-bottom: 3px; margin:0px;padding-right: 3px'><u>" + obj.data.name + "</u></h3>" +
                        "<p style='font-size: 13px;font-family: Arial, Helvetica, sans-serif;padding:7px''>" + "Credit Limit: 1,234,567" + " <br>"
                        + "PG Received: 1,234,567" + "<br>" + "PG Issued: 1,234,567" +
                        " <br>" + "Unlimited PG: No" + "<br>" + "Collateral Net Given: 1,234,567" + "<br>"
                        + "Collateral Net Received: 1,234,567" + " <br>" + "Exposure: 1,234,567" + "<br>" + "</p>" +
                        "</div>" ;
    obj.tooltip.position = 'TopCenter'
    obj.tooltip.relativeMode = 'Object',
    // obj.annotations={
    //   content: 'asdf',
    //   offset: { x: 0.5, y: 1.1 },
    //   verticalAlignment :'Top',
    //   horizontalAlignment :'Center'
    // },
    obj.tooltip.animation = {
      open: {
        effect: 'None',
        delay: 100
      },
      close: {
        effect: 'None',
        delay: 100
      }
    }
  },

  //  Sets the default values of connectors
  getConnectorDefaults: function (connector) {
    connector.type = 'Straight';
    connector.cornerRadius = 7;
    connector.targetDecorator.height = 7;
    connector.targetDecorator.width = 7;
    connector.style.strokeColor = 'grey';
    connector.style.strokeWidth=2;
    connector.style.strokeDashArray =''
    connector.targetDecorator = {
                style: {
                    strokeColor: 'grey',
                    fill: 'grey',
                }
            }
    connector.visible = _this.tt.cp == "tre"?false:true
  },
});
//diagram.clear();
diagram.appendTo('#diagram');
// diagram.clear();
// diagram.destroy()
// if(diagram.isDestroyed){
// // //console.log(diagram.isDestroyed)
//   diagram.appendTo('#diagram');
// }

//diagram.clear();



document.getElementById("zoomIn").onclick = (args: MouseEvent) => { 
  //To perform diagram ZoomIn 
   diagram.zoomTo({type: "ZoomIn"});
}
document.getElementById("Updatedatasource").onclick = (args: MouseEvent) => {
   let newobject1 = {"name":"node278","fillColor":"red","reprotingPerson":["node244"],"cp":"ABC"};
   let newobject2 = {"name":"node279","fillColor":"yellow","reprotingPerson":["node244"],"cp":"ABC"};
   _this.tt.push(newobject1);
   _this.tt.push(newobject2);
   diagram.clear();
   diagram.refresh();
   diagram.doLayout();

}
document.getElementById("zoomOut").onclick = (args: MouseEvent) => {
  //To perform diagram ZoomOut
    diagram.zoomTo({type: "ZoomOut"});
}
//Click Event for Appearance of the layout.
document.getElementById('diagram').onclick = (args: MouseEvent) => {
  let target: HTMLElement = args.target as HTMLElement; 
  if (target.className === 'image-pattern-style') {
    let id: string = target.id;
    let orientation1: string = id.substring(0, 1).toUpperCase() + id.substring(1, id.length);
    diagram.layout.orientation = orientation1 as LayoutOrientation;
    diagram.dataBind();
    diagram.doLayout(); 
  }

  diagram.reset();
};


}
}

