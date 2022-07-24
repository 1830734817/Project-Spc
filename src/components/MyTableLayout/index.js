/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-11-25 14:03:18
 * @LastEditors: shoen
 * @LastEditTime: 2021-05-13 13:39:35
 */
import React,{PureComponent} from 'react';
import { Table } from 'antd';
import { omit,isEmpty } from 'lodash';
import { Resizable } from 'react-resizable';
import 'antd/dist/antd.css';
import './index.css';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

let type = 'DragableBodyRow';
const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

type = 'ResizeableTitle';
const ResizeableTitle = props => {
  const {onResize, width, className, handle = () => {}, index, moveCell, column, ...restProps} = props;
  const ref = React.useRef();
  const [{isOver, dropClassName}, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? " drop-over-downward" : " drop-over-upward"
      };
    },
    drop: item => {
      moveCell(item.index, index);
    }
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  drop(drag(ref));
  if (!width) {
    return <th {...restProps} />;
  }
  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      {//这里是做的特殊区分，有些表头不能拖拽
        // column.key == 'eEdit' || column.key == 'taskInfo' || column.key == 'eLock' 
        // || column.key == 'material_count' || column.key == 'title' || column.key == 'scoreVOs' 
        // || !column.drag_able || column.is_lock ?
        // <th
        //   style={{width:width}}
        //   {...restProps}
        // />
        // :
        <th className={`${className}${isOver ? dropClassName : ''}`}>
          <span ref={ref} {...restProps} style={{ cursor: "move", width:width }}></span>
        </th>
      } 
    </Resizable>
  );
};

export default class TableLayout extends PureComponent{
  state = {
    columns: this.props.columns,
    data:[],
    update:false,
  }
  
  components = {
    header: {
      cell: ResizeableTitle,
    },
    // 表格内容暂不支持行拖拽
    // body: {
    //   row: DragableBodyRow,
    // },
  };

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  moveCell = (dragIndex, hoverIndex) => {
    const  _columns  = this.state.columns;
    const dragCell = _columns[dragIndex];
    // const hoverCell = _columns[hoverIndex];
    let newColumns = update(this.state.columns,{$splice:[[dragIndex, 1], [hoverIndex, 0, dragCell]]}); 

    let j = 0
    let rowData = [];
    for (let i = 0; i < _columns.length; i++) {
      _columns.forEach((_column) => {
        if (newColumns[i].key == _column.key) {
          _column.order = j;
          j++;
          rowData.push(_column)
        }
      })
    }
    
    this.setState({  
      columns: newColumns,
      data: rowData
    })
  };

  moveRow = (dragIndex, hoverIndex) => {
      const dragRow = this.state.data[dragIndex]; 
      let newRow = update(this.state.data,{$splice:[[dragIndex, 1], [hoverIndex, 0, dragRow]]}); 
      this.setState({
         data: newRow,
         update:true
      });
  };

  render() {
    const { pagination,loading,isLoading,columns,tt,...otherProps} = this.props;

    return <DndProvider backend={HTML5Backend} >
              <Table bordered 
                  size='middle'
                  scroll = {{ x: 1300}}
                  components = {this.components}                          // 覆盖默认的 table 元素
                  locale = {{ emptyText: '暂无数据'}}
                  loading = {loading || isLoading}
                  columns = {this.state.columns.map((col, index) => ({    // （1）表头
                     ...col,
                     onHeaderCell: column => ({
                       width: column.width,
                       onResize: this.handleResize(index),                // 表头可伸缩函数
                       index:index,
                       moveCell: this.moveCell,                           // 表头拖拽
                       column: column,                                    // 表头数据
                     }),
                  }))}
                  onRow={(record, index) => ({
                    index:index,
                    moveRow:this.moveRow,
                  })}
                  pagination = {                                          // （2）分页
                    !isEmpty(pagination) ? 
                      // 显示分页器
                      pagination.total > 10 && {                          // pagination 参数
                        ...omit(pagination,'pageIndex'),                  // 1）pageSize: 每页条数 & onChange: 分页、排序、筛选变化时触发; omit排除pagination中pageIndex，剩下pageSize
                                                                          // 2）total
                                                                          // 3）onChange: this.onPageChange                                                       
                        current:pagination.pageIndex,                     // 4）current：当前页数
                        showTotal:(total,range)=>{                        // 5）showTotal：用于显示数据总量和当前数据顺序
                          console.log(range);                             // 第一页(1-10): range[0]=1 & range[1]=10; 第二页（11-20） : range[0]=11 & range[1]=20
                          return (
                            <div style={{lineHeight:'26px'}}>
                              总共{total}条，每页10条
                            </div>
                          )
                        }
                      }
                      // 不显示分页器
                    : false
                  }
                  dataSource={this.state.data}
                  {...otherProps}                                         // rowKey & loading & dataSource 
          />
          </DndProvider>
  }
}
