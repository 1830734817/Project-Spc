import React, { Component } from 'react';
import { gantt } from 'dhtmlxgantt';
import 'dhtmlxgantt/codebase/ext/dhtmlxgantt_tooltip.js';
import 'dhtmlxgantt/codebase/dhtmlxgantt.css';
import { GANTT_LOCALE } from './configs';
import './index.less';

export default class Gantt extends Component {
	state = {
		data: []
	};
	shouldComponentUpdate(nextProps) {
		return this.props.zoom !== nextProps.zoom;
	}
	componentWillUnmount() {
		if (this.dataProcessor) {
			this.dataProcessor = null;
    }
		gantt.clearAll()
		console.log('gantt unmount')
	}
	UNSAFE_componentWillMount() {
		/* 展示tooltip信息 */
		// gantt.attachEvent("onGanttReady", function(){
		//   let tooltips = gantt.ext.tooltips;
		//   tooltips.tooltip.setViewport(gantt.$task_data);
		//   tooltips.tooltip.setContent(<div>aaa</div>);
		// });
	}
	componentDidMount() {
		/* multi-demo */
		const { tasks } = this.props;
		/* 如果给出了多条订单号 */
		// let gantt = window.Gantt.getGanttInstance();
		gantt.locale = GANTT_LOCALE;
		this.initBasicGantt(gantt); // gantt 显示上的初始化设置
		this.initTemplateWorkTime(gantt); // 设置工作日和非工作日的区别显示
		this.initGanttDataProcessor(gantt);
		// adding baseline display
		gantt.addTaskLayer(function draw_planned(task) {
			if (task.planned_start && task.planned_end) {
				var sizes = gantt.getTaskPosition(
					task,
					task.planned_start,
					task.planned_end
				);
				var el = document.createElement('div');
				el.className = 'baseline';
				el.style.left = sizes.left + 'px';
				el.style.width = sizes.width + 'px';
				el.style.top = sizes.top + gantt.config.task_height + 13 + 'px';
				return el;
			}
			return false;
		});
		/* set task-element */
		gantt.attachEvent('onTaskLoading', function(task) {
			task.planned_start = gantt.date.parseDate(task.planned_start, 'xml_date');
			task.planned_end = gantt.date.parseDate(task.planned_end, 'xml_date');
			return true;
		});
		gantt.init(this.ganttContainer);
		gantt.parse(tasks); // 注入数据
	}
	componentDidUpdate() {
		gantt.render();
	}
	/* 设置基本信息 */
	initBasicGantt = gantt => {
		gantt.config.auto_scheduling = true; //启用自动调度
		gantt.locale.labels.section_split = 'Display';
		gantt.config.xml_date = '%Y-%m-%d %H:%i';
		gantt.config.date_scale = '%m-%d'; //时间格式
		gantt.config.order_branch = false; //锁定左侧不让拖拽
		gantt.config.fit_tasks = true; //当task的长度改变时，自动调整图表坐标轴区间用于适配task的长度
		gantt.config.grid_resizer_attribute = 'gridresizer'; //设置 resizer(调整宽度的那个东西) DOM元素的属性名
		// gantt.config.grid_width = 600;//左侧列表宽度
		// gantt.config.min_column_width = 150;//时间轴列宽度
		gantt.config.prevent_default_scroll = true; //阻止鼠标滚动事件冒泡
		gantt.config.preserve_scroll = false; //图表刷新后，滚动条的位置跟原来保持一致
		gantt.config.redo = true; //重做功能
		gantt.config.scroll_on_click = false; //当点击任务时，时间轴的滚动条滚动，将任务放在可见的范围。
		gantt.config.scroll_size = 20; //滚动条尺寸
		gantt.config.show_task_cells = true; //时间轴图表中，如果不设置，只有行边框，区分上下的任务，设置之后带有列的边框，整个时间轴变成格子状
		gantt.config.task_height = 16;
		gantt.config.row_height = 40;

		/* 计划基准线的设置 */
		gantt.locale.labels.baseline_enable_button = '设置';
		gantt.locale.labels.baseline_disable_button = '移除';
		gantt.locale.labels.section_baseline = '计划执行时间';

		gantt.config.columns = [
			{ name: 'text', label: '设备', tree: true, width: '*' },
			{ name: 'capacityValue', label: '产能', align: 'center' },
			{ name: 'add', label: '', hide:true }
		];
		gantt.config.scale_unit = 'month'; //按年显示
		gantt.config.step = 1; //设置时间刻度的步长（X轴）
		gantt.config.date_scale = '%F, %Y'; //日期尺度按年
		gantt.config.subscales = [{ unit: 'day', step: 1, date: '%j, %D' }];
		gantt.config.open_split_tasks = true;
	};
	/* 设置数据更新进程 */
	initGanttDataProcessor(gantt) {
		const onDataUpdated = this.props.onDataUpdated;
		this.dataProcessor = gantt.createDataProcessor(
			(entityType, action, item, id) => {
				return new Promise((resolve, reject) => {
					if (onDataUpdated) {
						onDataUpdated(entityType, action, item, id);
					}
					return resolve();
				});
			}
		);
	}
	/* 设置工作时间 */
	initTemplateWorkTime = gantt => {
		const workHours = [8, 20];
		gantt.config.work_time = true;
		// gantt.config.skip_off_time = true;
		gantt.setWorkTime({ day: 5, hours: workHours });
		gantt.templates.scale_cell_class = date => {
			//调试器;
			if (!gantt.isWorkTime(date)) {
				return 'weekend';
			}
		};
		gantt.templates.task_cell_class = (task, date) => {
			/* 区别工作时间 */
			if (this.props.zoom === 'Hours') {
				if (date.getHours() < workHours[0]) {
					return 'no_work_hour';
				}
				if (date.getHours() > workHours[1]) {
					return 'no_work_hour';
				}
			}
			if (!gantt.isWorkTime({ task: task, date: date })) {
				return 'weekend';
			}
		};
		gantt.templates.task_class = function(start, end, task) {
			if (task.planned_end) {
				var classes = ['has-baseline'];
				if (end.getTime() > task.planned_end.getTime()) {
					classes.push('overdue');
				}
				return classes.join(' ');
			}
		};

		gantt.templates.rightside_text = function(start, end, task) {
			if (task.planned_end) {
				if (end.getTime() > task.planned_end.getTime()) {
					var overdue = Math.ceil(
						Math.abs(
							(end.getTime() - task.planned_end.getTime()) /
								(24 * 60 * 60 * 1000)
						)
					);
					var text = '<b>Overdue: ' + overdue + ' days</b>';
					return text;
				}
			}
		};
	};
	setZoom(value) {
    // gantt.ext.zoom.setLevel(value);
    switch (value) {
      case 'Hours':
        gantt.config.scale_unit = 'day';
        gantt.config.date_scale = '%d %M';
        gantt.config.scale_height = 60;
        gantt.config.min_column_width = 30;
        gantt.config.subscales = [
            { unit:'hour', step:1, date:'%H' }
        ];
      break;
      case 'Days':
        gantt.config.min_column_width = 50;
        gantt.config.scale_height = 54;
        gantt.config.date_scale = '%F, %Y';
        gantt.config.scales = [
          {unit: "day", format: "%j %d"},
          {unit: "hour", step: 3, format: "%H:%i"}
        ];
      break;
      case 'Weeks':
        const weekScaleTemplate = (date)=>{
          let dateToStr = gantt.date.date_to_str("%M %Y");
          // let endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
          return dateToStr(date);
        };
        gantt.config.scale_unit = "week";
        gantt.config.step = 1;
        gantt.templates.date_scale = weekScaleTemplate;
        gantt.config.subscales = [
          {unit:"day", step:1, date:"%D,%j" }
        ];
        gantt.config.min_column_width = 20;
        gantt.config.scale_height = 50;
      break;
      case 'Months':
        gantt.config.min_column_width = 70;
        gantt.config.scale_unit = 'year';
        gantt.config.date_scale = '%Y';
        gantt.config.scale_height = 60;
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
	render() {
		const { zoom,} = this.props;
		this.setZoom(zoom);
		return (
			<div style={{ width: '100%', height: '100%' }}>
				<div
					ref={input => {
						this.ganttContainer = input;
					}}
					style={{ width: '100%', height: '100%' }}
				></div>
			</div>
		);
	}
}
