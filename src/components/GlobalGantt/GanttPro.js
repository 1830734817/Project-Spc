import React,{Component} from 'react';
import { gantt } from 'dhtmlxgantt';
import 'dhtmlxgantt/codebase/ext/dhtmlxgantt_tooltip.js'
import 'dhtmlxgantt/codebase/dhtmlxgantt.css';
import { GANTT_LOCALE } from './configs';
import GlobalFooter from '../GlobalFooter';
import './index.less';

export default class Gantt extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.zoom !== nextProps.zoom;
  }
  componentWillUnmount() {
    if (this.dataProcessor) {
      this.dataProcessor = null;
    }
    gantt.clearAll();
    console.log('gantt unmount')
  }
  componentDidMount(){
    this.setGanttConfig()
  }
  componentDidUpdate(){
    gantt.render();
  }
  /* 设置gantt 的全局设置 */
  setGanttConfig = ()=>{
    const { tasks } = this.props;
    gantt.locale = GANTT_LOCALE;
    this.initBasicGantt(); // gantt 显示上的初始化设置
    this.initTemplateWorkTime(); // 设置工作日和非工作日的区别显示
    this.initLightBoxContent(); // 设置弹出框内容
    this.initGanttDataProcessor();
 
    // adding baseline display
    gantt.addTaskLayer({
      renderer: {
        render:function draw_planned(task) {
          if (task.planned_start && task.planned_end) {
            let sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end);
            let el = document.createElement('div');
            el.className = 'baseline';
            el.style.left = sizes.left + 'px';
            el.style.width = sizes.width + 'px';
            el.style.top = sizes.top + gantt.config.task_height + 13 + 'px';
            return el;
          }
          return false;
        },
        update: function (task, node, timeline, viewport) {
        },
      },
    })
    /* set task-element */
    gantt.attachEvent("onTaskLoading", function (task) {
      task.planned_start = gantt.date.parseDate(task.planned_start, "xml_date");
      task.planned_end = gantt.date.parseDate(task.planned_end, "xml_date");
      return true;
    });
    /* task 事件 */
    gantt.attachEvent("onAfterTaskUpdate", function(id,item){
      //any custom logic here
      console.log('test',id)

    });
    gantt.attachEvent("onBeforeTaskChanged",function(id, mode, task){
      // any custom logic here
      if(task.isNew){
        return true
      }else{
        return false
      }
    });

    gantt.init(this.ganttContainer);
    gantt.parse(tasks);
  }
  /* 设置基本信息 */
  initBasicGantt = ()=>{
    gantt.config.auto_scheduling = true;//启用自动调度
    gantt.locale.labels.section_split = "Display";
    gantt.config.xml_date = "%Y-%m-%d %H:%i";
    gantt.config.date_scale = "%m-%d"; //时间格式
    gantt.config.order_branch = false;//锁定左侧不让拖拽
    gantt.config.fit_tasks = true;  //当task的长度改变时，自动调整图表坐标轴区间用于适配task的长度
    gantt.config.grid_resizer_attribute = "gridresizer"; //设置 resizer(调整宽度的那个东西) DOM元素的属性名
    // gantt.config.grid_width = 600;//左侧列表宽度
    // gantt.config.min_column_width = 150;//时间轴列宽度
    gantt.config.prevent_default_scroll = true;//阻止鼠标滚动事件冒泡
    gantt.config.preserve_scroll = false;//图表刷新后，滚动条的位置跟原来保持一致
    gantt.config.redo = true;//重做功能
    gantt.config.scroll_on_click= false;//当点击任务时，时间轴的滚动条滚动，将任务放在可见的范围。
    gantt.config.scroll_size = 20;//滚动条尺寸
    gantt.config.show_task_cells = true;//时间轴图表中，如果不设置，只有行边框，区分上下的任务，设置之后带有列的边框，整个时间轴变成格子状
    gantt.config.task_height = 16;
    gantt.config.row_height = 40;

    gantt.config.fit_tasks = true; //页面布局自适应

    /* 计划基准线的设置 */
    gantt.locale.labels.baseline_enable_button = '设置';
    gantt.locale.labels.baseline_disable_button = '移除';
    gantt.locale.labels.section_baseline = "计划执行时间";

    gantt.config.columns=[
      {name:"text", label:"设备", tree:true, width:"*" },
      {name:"capacityValue", label:"产能",align:"center" },
      {name:"add", label:"", }
    ];
    gantt.config.scale_unit = "month"; //按年显示
    gantt.config.step = 1;	//设置时间刻度的步长（X轴）
    gantt.config.date_scale = '%Y年%M';
    gantt.config.subscales = [
      {unit: "day",step:1, date: "%j日"},
    ];

  }
  /* 设置数据更新进程 */
  initGanttDataProcessor(){
    const onDataUpdated = this.props.onDataUpdated;
    this.dataProcessor = gantt.createDataProcessor((entityType, action, item, id) => {
      return new Promise((resolve, reject) => {
        if (onDataUpdated) {
          onDataUpdated(entityType, action, item, id);
        }
        return resolve();
      });
    });
  }
  /* 设置工作时间 */
  initTemplateWorkTime = ()=>{
    const workHours = [8,20];
    gantt.config.work_time = true;
    // gantt.config.skip_off_time = true; 
    gantt.setWorkTime({day:5,hours:workHours});
    gantt.templates.scale_cell_class = (date) => {
      //调试器;
      if(!gantt.isWorkTime(date)){
        return "weekend";
      }
    };        
    gantt.templates.task_cell_class = (task,date) => {

      /* 区别工作时间 */
      if(this.props.zoom === 'Hours'){
        if (date.getHours() < workHours[0]) {
          return "no_work_hour";
        }
        if (date.getHours() > workHours[1]) {
          return "no_work_hour";
        }
      }
      if(!gantt.isWorkTime({task:task, date:date})){
        return "weekend" ;
      } 
    };
    gantt.templates.task_class = function (start, end, task) {
      if (task.planned_end) {
        var classes = ['has-baseline'];
        if (end.getTime() > task.planned_end.getTime()) {
          classes.push('overdue');
        }
        return classes.join(' ');
      }                               　　　　　　　
    };

    gantt.templates.rightside_text = function (start, end, task) {
      if (task.planned_end) {
        if (end.getTime() > task.planned_end.getTime()) {
          var overdue = Math.ceil(Math.abs((end.getTime() - task.planned_end.getTime()) / (24 * 60 * 60 * 1000)));
          var text = "<b>Overdue: " + overdue + " days</b>";
          return text;
        }
      }
    };
    
  }

  /* 设置lightbox 弹窗内容 */
  initLightBoxContent = () => {
    gantt.config.lightbox.sections = [
  		{name: "description", height: 38, map_to: "text", type: "textarea", focus: true,editor:''},
      {name:"capacityValue",map_to: "capacityValue"},
      {name: "time",height: 40,type: "time", map_to: 'auto', time_format: ["%Y", "%m", "%d", "%H:%i"]},
      // {
      //   name: "baseline",
      //   map_to: {start_date: "planned_start", end_date: "planned_end"},
      //   button: true,
      //   type: "duration_optional"
      // }
    ];
    gantt.locale.labels["section_capacityValue"] = "产能";
    gantt.locale.labels["section_description"] = "加工数量";
    gantt.locale.labels["section_time"] = "实际时间";
    if(this.props.params.status === 'edit'){
      gantt.locale.labels["section_time"] = "计划时间";
    }
    gantt.locale.labels["icon_save"] = "保存";
    
    /* 区别排程 新增的排程 颜色判断 --- 只有编辑状态下允许修改  */
    if(this.props.params.status === 'edit'){
      let componentcode = this.props.params.componentcode || '';
      gantt.templates.task_class = function(start, end, task) {
        if (task.componentCode === componentcode) {
          return 'blue';
        } else {
          return 'gray';
        }
      };
    }
    gantt.attachEvent('onBeforeLightbox', function(id) {
      let task = gantt.getTask(id);
      if(task.$new){
        task.hide = true;
        task.isNew = true;
        task.componentCode = '';
        task.capacityValue = '-';
      }
      if (task.noscheduled == 0 || !task.isNew) {
        return false;
      } else {
        let list = document.getElementsByClassName('gantt_tree_content');
        for (let i = 0; i < list.length; i++) {
          if (list[i].innerHTML == 'undefined') {
            list[i].innerHTML = '-';
          }
        }
        return true;
      }
    });
  }
  setZoom(value) {
    switch (value) {
      case 'Hours':
        gantt.config.scale_height = 60;
        gantt.config.min_column_width = 30;
        gantt.config.scale_unit = "day";
        gantt.config.date_scale = '%Y年%M%d日';
        gantt.config.subscales = [
            { unit:'hour', step:1, date:'%H:%i' }
        ];
      break;
      case 'Days':
        gantt.config.min_column_width = 50;
        gantt.config.scale_height = 54;
        gantt.config.scale_unit = "month";
        gantt.config.date_scale = '%Y年%M';
        gantt.config.subscales = [
          {unit: "day",step:1, date: "%j日"},
        ];
      break;
      case 'Weeks':
        const weekScaleTemplate = (date)=>{
          let dateToStr = gantt.date.date_to_str("%Y年%M");
          return dateToStr(date);
        };
        gantt.config.step = 1;
        gantt.config.min_column_width = 20;
        gantt.config.scale_height = 50;
        gantt.config.scale_unit = "week";
        gantt.templates.date_scale = weekScaleTemplate;
        gantt.config.subscales = [
          {unit:"day", step:1, date:"%j,%D" }
        ];
      break;
      case 'Months':
        gantt.config.min_column_width = 70;
        gantt.config.scale_height = 60;
        gantt.config.scale_unit = 'year';
        gantt.config.date_scale = '%Y';
        gantt.config.subscales = [
            { unit:'month', step:1, date:'%F' }
        ];
      break;
      case 'Year':
        gantt.config.min_column_width = 50;
        gantt.config.scale_height = 90;
        const monthScaleTemplate = function (date) {
          let dateToStr = gantt.date.date_to_str("%M");
          let endDate = gantt.date.add(date, 2, "month");
          return dateToStr(date) + " - " + dateToStr(endDate);
        };
        gantt.config.scales = [
          {unit: "year", step: 1, format: "%Y"},
          {unit: "month", step: 3, format: monthScaleTemplate},
          {unit: "month", step: 1, format: "%M"}
        ];
      break;
      default:
      break;
    }
  }
  lightboxSave = ()=>{
    gantt.attachEvent('onLightboxSave', function(id, item,isNew) {
      /* 校验输入数量 */
      if (!item.text) {
        gantt.message({ type: 'error', text: '请输入加工数量!' });
        return false;
      }
      let regExp = /^[0-9]*[1-9][0-9]*$/; //正整数
      if (!regExp.test(item.text)) {
        gantt.message({ type: 'error', text: '请输入正确的数量!' });
        return false;
      }
      let parentId = gantt.getTask(item.parent); //父id
      parentId.remainingCount = parentId.remainingCount - item.text;
      let number = item.text;
      let temp = { ...item,text:number, process:0.5,parent:parentId.id,componentCode:'',capacityValue:'-',hide:true}
      gantt.addTask(temp);
      gantt.render()
      return true;

    })
  }
  onSubmit = ()=>{
    gantt.render();
    let json = gantt.serialize().data;
    // console.log(json)
    let data = [];
    for( let i = 0 ; i < json.length ; i++ ){
      // a way to get the data of gantt's add ,and transform to params of save_request
      if(json[i].isNew){
        let item = {}
        item = {
          rate : json[i].progress,
          // excuteDays:json[i].duration,
          parent:json[i].parent,
          /* 接口入参 */
          planCount:json[i].text,
          startTime:json[i].start_date,
          endTime:json[i].end_date,
        }
        data.push(item);
      }
    }
    data.map(curent =>{
      json.map(lv1=>{
        if(curent.parent === lv1.id.toString()){
          Object.assign(curent,{
            procedureId:lv1.procedureId,
            deviceId:lv1.devId
          })
          if(this.props.type === 'union'){
            Object.assign(curent,{
              mouldId:lv1.mouldId
            })
          }
        }
      })
    })
    this.props.onSubmit(data,()=>{
      gantt.clearAll();// 暂时作为刷新依据
    });
    
  }
  render() {
    const { zoom } = this.props;
    this.setZoom(zoom);
    this.lightboxSave();
    return (<React.Fragment>
      <div
        ref={ (input) => { this.ganttContainer = input } }
        className='gantt_pro'
      ></div>
      {this.props.params.status === 'edit' && <GlobalFooter
          btns={
            [
              {
                name:'提交',
                type:'primary',
                onClick:this.onSubmit
              }
            ]
          }
        />}
    </React.Fragment>
    );
  }
}


