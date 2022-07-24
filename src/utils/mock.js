
import { uniq } from 'lodash'

/**
 * 获取两数之间的随机数
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

/**
 * 设置ganttde mock 图
 * decs: 对进度
 */

export function ganttDataMock({
  record,
}){
  /* 设置工序的随机 */
  let pro01 = {
    "procedureId": "30",
    "procedureName": "压铸",
    "sort":1,
    "timeVOS": [{
      "devId": 72,
      "devName": "压铸机02",
      "capacityValue": 120,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": record.masterCode,
        "componentName": record.masterCode,
        "productValue": 120,
        "workVOS": [{
          "time": "2019-06-12 00:00:00",
          planned_start:'2019-06-12 00:00:00',
          planned_end:'2019-06-15 00:00:00',
          "days": 2,
          "scheduled": getRandomInt(100,600),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }, {
      "devId": 71,
      "devName": "压铸机01",
      "capacityValue": 120,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": record.masterCode,
        "componentName": record.masterCode,
        "productValue": 120,
        "workVOS": [{
          "time": "2019-06-15 00:00:00",
          planned_start:'2019-06-15 00:00:00',
          planned_end:'2019-06-20 00:00:00',
          "days": 3,
          "scheduled": getRandomInt(100,600),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  };
  let pro02 = {
    "procedureId": "31",
    "procedureName": "去毛刺",
    "sort":2,
    "timeVOS": [{
      "devId": 74,
      "devName": "去毛刺机02",
      "capacityValue": 500,
      "devVOS": []
    }, {
      "devId": 73,
      "devName": "去毛刺机01",
      "capacityValue": 500,
      "devVOS": [{
        "scheduleId": "103",
        "scheduleNumber": "sche190731152049759",
        "planNo": "prod190723164406062",
        "componentCode": record.masterCode,
        "componentName": record.masterCode,
        "productValue": 500,
        "workVOS": [{
          "time": "2019-06-18 00:00:00",
          planned_start:'2019-06-18 00:00:00',
          planned_end:'2019-06-23 00:00:00',
          "days": 3,
          "scheduled": getRandomInt(100,600),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }, {
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": record.masterCode,
        "componentName": record.masterCode,
        "productValue": 500,
        "workVOS": [{
          "time": "2019-06-18 00:00:00",
          planned_start:'2019-06-18 00:00:00',
          planned_end:'2019-06-23 00:00:00',
          "days": 2,
          "scheduled": getRandomInt(100,600),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  };
  let pro03 = {
    "procedureId": "32",
    "procedureName": "热处理",
    "sort":3,
    "timeVOS": [{
      "devId": 76,
      "devName": "热处理炉02",
      "capacityValue": 1000,
      "devVOS": []
    }, {
      "devId": 75,
      "devName": "热处理炉01",
      "capacityValue": 1000,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": record.masterCode,
        "componentName": record.masterCode,
        "productValue": 1000,
        "workVOS": [{
          "time": "2019-06-19 00:00:00",
          planned_start:'2019-06-19 00:00:00',
          planned_end:'2019-06-23 00:00:00',
          "days": 3,
          "scheduled": getRandomInt(100,600),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  }
  let pro04 = {
    "procedureId": "33",
    "procedureName": "抛丸",
    "sort":4,
    "timeVOS": [{
      "devId": 77,
      "devName": "抛丸机01",
      "capacityValue": 1000,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": record.masterCode,
        "componentName": record.masterCode,
        "productValue": 1000,
        "workVOS": [{
          "time": "2019-06-23 00:00:00",
          planned_start:'2019-06-23 00:00:00',
          planned_end:'2019-06-24 00:00:00',
          "days": 3,
          "scheduled": getRandomInt(100,1000),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  };
  let pro05 = {
    "procedureId": "34",
    "procedureName": "CNC",
    "sort":5,
    "timeVOS": [{
      "devId": 80,
      "devName": "CNC03",
      "capacityValue": 150,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": record.masterCode,
        "componentName": record.masterCode,
        "productValue": 150,
        "workVOS": [{
          "time": "2019-06-27 00:00:00",
          planned_start:'2019-06-27 00:00:00',
          planned_end:'2019-06-29 00:00:00',
          "days": 2,
          "scheduled": getRandomInt(100,500),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }, {
      "devId": 79,
      "devName": "CNC02",
      "capacityValue": 150,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": record.masterCode,
        "componentName": record.masterCode,
        "productValue": 150,
        "workVOS": [{
          "time": "2019-06-27 00:00:00",
          planned_start:'2019-06-27 00:00:00',
          planned_end:'2019-06-29 00:00:00',
          "days": 2,
          "scheduled": getRandomInt(100,500),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }, {
      "devId": 78,
      "devName": "CNC01",
      "capacityValue": 150,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": record.masterCode,
        "componentName": record.masterCode,
        "productValue": 150,
        "workVOS": [{
          "time": "2019-06-27 00:00:00",
          planned_start:'2019-06-27 00:00:00',
          planned_end:'2019-06-29 00:00:00',
          "days": 2,
          "scheduled": getRandomInt(100,500),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  };
  let pro06 = {
    "procedureId": "35",
    "procedureName": "立式加工",
    "sort":6,
    "timeVOS": [{
      "devId": 81,
      "devName": "立式加工中心01",
      "capacityValue": 130,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": record.masterCode,
        "componentName": record.masterCode,
        "productValue": 150,
        "workVOS": [{
          "time": "2019-07-01 00:00:00",
          planned_start:'2019-07-01 00:00:00',
          planned_end:'2019-07-03 00:00:00',
          "days": 3,
          "scheduled": getRandomInt(100,500),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  }
  let pro07 = {
    "procedureId": "36",
    "procedureName": "检测气密性",
    "sort":7,
    "timeVOS": [{
      "devId": 83,
      "devName": "气密性设备02",
      "capacityValue": 300,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": record.masterCode,
        "componentName": record.masterCode,
        "productValue": 150,
        "workVOS": [{
          "time": "2019-07-03 00:00:00",
          planned_start:'2019-07-03 00:00:00',
          planned_end:'2019-07-05 00:00:00',
          "days": 3,
          "scheduled": getRandomInt(100,500),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }, {
      "devId": 82,
      "devName": "气密性设备01",
      "capacityValue": 300,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": record.masterCode,
        "componentName": record.masterCode,
        "productValue": 150,
        "workVOS": [{
          "time": "2019-07-03 00:00:00",
          planned_start:'2019-07-03 00:00:00',
          planned_end:'2019-07-05 00:00:00',
          "days": 3,
          "scheduled": getRandomInt(100,600),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  };
  let pro08 = {
    "procedureId": "37",
    "procedureName": "清洗",
    "sort":8,
    "timeVOS": [{
      "devId": 84,
      "devName": "清洗机01",
      "capacityValue": 1000,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": record.masterCode,
        "componentName": record.masterCode,
        "productValue": 150,
        "workVOS": [{
          "time": "2019-07-06 00:00:00",
          planned_start:'2019-07-06 00:00:00',
          planned_end:'2019-07-08 00:00:00',
          "days": 2,
          "scheduled": getRandomInt(100,500),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  };
  let pro09 = {
    "procedureId": "38",
    "procedureName": "涂装",
    "sort":9,
    "timeVOS": [{
      "devId": 85,
      "devName": "喷涂线01",
      "capacityValue": 1000,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": record.masterCode,
        "componentName": record.masterCode,
        "productValue": 150,
        "workVOS": [{
          "time": "2019-07-08 00:00:00",
          planned_start:'2019-07-08 00:00:00',
          planned_end:'2019-07-10 00:00:00',
          "days": 2,
          "scheduled": getRandomInt(100,500),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  };
  let pro010 = {
    "procedureId": "39",
    "procedureName": "包装",
    "sort":10,
    "timeVOS": [{
      "devId": 95,
      "devName": "包装",
      "capacityValue": 500,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": record.masterCode,
        "componentName": record.masterCode,
        "productValue": 1000,
        "workVOS": [{
          "time": "2019-07-10 00:00:00",
          planned_start:'2019-07-11 00:00:00',
          planned_end:'2019-07-12 00:00:00',
          "days": 2,
          "scheduled": getRandomInt(100,1000),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  };
  let res = {
    data:{
      code:1,
      data:[pro01]
    }
  };
  let arrayList = [pro01,pro02,pro03,pro04,pro05,pro06,pro07,pro08,pro09,pro010],listLength = Math.round(Math.random()*10);
  for(let i = 1; i <= listLength; i++) {
    let index = Math.round(Math.random()*10)
    if(index > 0 && index <= 9){
      res.data.data.push(arrayList[index])
    } 
  }
  res.data.data.sort(function (a, b) {
    return (a.sort - b.sort)
  })
  uniq(res.data.data)
  return res
}

/**
 * 设置所有gantt 数据的展示
 */
export function ganttAllDataAnaly(){
   /* 设置工序的随机 */
   let pro01 = {
    "procedureId": "30",
    "procedureName": "压铸",
    "sort":1,
    "timeVOS": [{
      "devId": 72,
      "devName": "压铸机02",
      "capacityValue": 120,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": '2018cswl',
        "componentName": '2018cswl',
        "productValue": 120,
        "workVOS": [{
          "time": "2019-06-12 00:00:00",
          planned_start:'2019-06-12 00:00:00',
          planned_end:'2019-06-15 00:00:00',
          "days": 2,
          "scheduled": getRandomInt(100,600),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }, {
      "devId": 71,
      "devName": "压铸机01",
      "capacityValue": 120,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": '2018cswl',
        "componentName": '2018cswl',
        "productValue": 120,
        "workVOS": [{
          "time": "2019-06-15 00:00:00",
          planned_start:'2019-06-15 00:00:00',
          planned_end:'2019-06-20 00:00:00',
          "days": 3,
          "scheduled": getRandomInt(100,600),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  };
  let pro02 = {
    "procedureId": "31",
    "procedureName": "去毛刺",
    "sort":2,
    "timeVOS": [{
      "devId": 74,
      "devName": "去毛刺机02",
      "capacityValue": 500,
      "devVOS": []
    }, {
      "devId": 73,
      "devName": "去毛刺机01",
      "capacityValue": 500,
      "devVOS": [{
        "scheduleId": "103",
        "scheduleNumber": "sche190731152049759",
        "planNo": "prod190723164406062",
        "componentCode": 'C82342C001',
        "componentName": 'C82342C001',
        "productValue": 500,
        "workVOS": [{
          "time": "2019-06-18 00:00:00",
          planned_start:'2019-06-18 00:00:00',
          planned_end:'2019-06-23 00:00:00',
          "days": 3,
          "scheduled": getRandomInt(100,600),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }, {
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": 'C82342C001',
        "componentName": 'C82342C001',
        "productValue": 500,
        "workVOS": [{
          "time": "2019-06-18 00:00:00",
          planned_start:'2019-06-18 00:00:00',
          planned_end:'2019-06-23 00:00:00',
          "days": 2,
          "scheduled": getRandomInt(100,600),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  };
  let pro03 = {
    "procedureId": "32",
    "procedureName": "热处理",
    "sort":3,
    "timeVOS": [{
      "devId": 76,
      "devName": "热处理炉02",
      "capacityValue": 1000,
      "devVOS": []
    }, {
      "devId": 75,
      "devName": "热处理炉01",
      "capacityValue": 1000,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": 'Cycz0002',
        "componentName": 'Cycz0002',
        "productValue": 1000,
        "workVOS": [{
          "time": "2019-06-19 00:00:00",
          planned_start:'2019-06-19 00:00:00',
          planned_end:'2019-06-23 00:00:00',
          "days": 3,
          "scheduled": getRandomInt(100,600),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  }
  let pro04 = {
    "procedureId": "33",
    "procedureName": "抛丸",
    "sort":4,
    "timeVOS": [{
      "devId": 77,
      "devName": "抛丸机01",
      "capacityValue": 1000,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": 'Cycz0001',
        "componentName": 'Cycz0001',
        "productValue": 1000,
        "workVOS": [{
          "time": "2019-06-23 00:00:00",
          planned_start:'2019-06-23 00:00:00',
          planned_end:'2019-06-24 00:00:00',
          "days": 3,
          "scheduled": getRandomInt(100,1000),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  };
  let pro05 = {
    "procedureId": "34",
    "procedureName": "CNC",
    "sort":5,
    "timeVOS": [{
      "devId": 80,
      "devName": "CNC03",
      "capacityValue": 150,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": 'C81132B023',
        "componentName": 'C81132B023',
        "productValue": 150,
        "workVOS": [{
          "time": "2019-06-27 00:00:00",
          planned_start:'2019-06-27 00:00:00',
          planned_end:'2019-06-29 00:00:00',
          "days": 2,
          "scheduled": getRandomInt(100,500),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }, {
      "devId": 79,
      "devName": "CNC02",
      "capacityValue": 150,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": 'C81132B023',
        "componentName": 'C81132B023',
        "productValue": 150,
        "workVOS": [{
          "time": "2019-06-27 00:00:00",
          planned_start:'2019-06-27 00:00:00',
          planned_end:'2019-06-29 00:00:00',
          "days": 2,
          "scheduled": getRandomInt(100,500),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }, {
      "devId": 78,
      "devName": "CNC01",
      "capacityValue": 150,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": 'C81132B023',
        "componentName": 'C81132B023',
        "productValue": 150,
        "workVOS": [{
          "time": "2019-06-27 00:00:00",
          planned_start:'2019-06-27 00:00:00',
          planned_end:'2019-06-29 00:00:00',
          "days": 2,
          "scheduled": getRandomInt(100,500),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  };
  let pro06 = {
    "procedureId": "35",
    "procedureName": "立式加工",
    "sort":6,
    "timeVOS": [{
      "devId": 81,
      "devName": "立式加工中心01",
      "capacityValue": 130,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": 'C81131B012',
        "componentName": 'C81131B012',
        "productValue": 150,
        "workVOS": [{
          "time": "2019-07-01 00:00:00",
          planned_start:'2019-07-01 00:00:00',
          planned_end:'2019-07-03 00:00:00',
          "days": 3,
          "scheduled": getRandomInt(100,500),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  }
  let pro07 = {
    "procedureId": "36",
    "procedureName": "检测气密性",
    "sort":7,
    "timeVOS": [{
      "devId": 83,
      "devName": "气密性设备02",
      "capacityValue": 300,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": 'Cycz0012',
        "componentName": 'Cycz0012',
        "productValue": 150,
        "workVOS": [{
          "time": "2019-07-03 00:00:00",
          planned_start:'2019-07-03 00:00:00',
          planned_end:'2019-07-05 00:00:00',
          "days": 3,
          "scheduled": getRandomInt(100,500),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }, {
      "devId": 82,
      "devName": "气密性设备01",
      "capacityValue": 300,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": 'Cycz0012',
        "componentName": 'Cycz0012',
        "productValue": 150,
        "workVOS": [{
          "time": "2019-07-03 00:00:00",
          planned_start:'2019-07-03 00:00:00',
          planned_end:'2019-07-05 00:00:00',
          "days": 3,
          "scheduled": getRandomInt(100,600),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  };
  let pro08 = {
    "procedureId": "37",
    "procedureName": "清洗",
    "sort":8,
    "timeVOS": [{
      "devId": 84,
      "devName": "清洗机01",
      "capacityValue": 1000,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": 'Cys1012',
        "componentName": 'Cys1012',
        "productValue": 150,
        "workVOS": [{
          "time": "2019-07-06 00:00:00",
          planned_start:'2019-07-06 00:00:00',
          planned_end:'2019-07-08 00:00:00',
          "days": 2,
          "scheduled": getRandomInt(100,500),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  };
  let pro09 = {
    "procedureId": "38",
    "procedureName": "涂装",
    "sort":9,
    "timeVOS": [{
      "devId": 85,
      "devName": "喷涂线01",
      "capacityValue": 1000,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": 'C81132B23l',
        "componentName": 'C81132B23l',
        "productValue": 150,
        "workVOS": [{
          "time": "2019-07-08 00:00:00",
          planned_start:'2019-07-08 00:00:00',
          planned_end:'2019-07-10 00:00:00',
          "days": 2,
          "scheduled": getRandomInt(100,500),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  };
  let pro010 = {
    "procedureId": "39",
    "procedureName": "包装",
    "sort":10,
    "timeVOS": [{
      "devId": 95,
      "devName": "包装",
      "capacityValue": 500,
      "devVOS": [{
        "scheduleId": "106",
        "scheduleNumber": "sche190810102745335",
        "planNo": "prod190723163919539",
        "componentCode": 'C81132B23d',
        "componentName": 'C81132B23d',
        "productValue": 1000,
        "workVOS": [{
          "time": "2019-07-10 00:00:00",
          planned_start:'2019-07-11 00:00:00',
          planned_end:'2019-07-12 00:00:00',
          "days": 2,
          "scheduled": getRandomInt(100,1000),
          "noscheduled": 0,
          "rate": parseFloat((Math.random()*1).toFixed(2))
        }]
      }]
    }]
  };
  let workList = [
    pro01,pro02,pro03,pro04,pro05,pro06,pro07,pro08,pro09,pro010
  ]
  // console.log()
  let res = {
    data:{
      code:1,
      data:workList
    }
  };
  return res
}
/**
 * 设置计划分析展示的gantt 数据
 */
export function ganttAllDataMock(
){
    /* 设置工序的随机 */
    let pro01 = {
      "procedureId": "30",
      "procedureName": "压铸",
      "sort":1,
      "timeVOS": [{
        "devId": 72,
        "devName": "压铸机02",
        "capacityValue": 120,
        "devVOS": [{
          "scheduleId": "106",
          "scheduleNumber": "sche190810102745335",
          "planNo": "prod190723163919539",
          "componentCode": '2018cswl',
          "componentName": '2018cswl',
          "productValue": 120,
          "workVOS": [{
            "time": "2019-06-12 00:00:00",
            planned_start:'2019-06-12 00:00:00',
            planned_end:'2019-06-15 00:00:00',
            "days": 2,
            "scheduled": getRandomInt(100,600),
            "noscheduled": 0,
            "rate": parseFloat((Math.random()*1).toFixed(2))
          }]
        }]
      }, {
        "devId": 71,
        "devName": "压铸机01",
        "capacityValue": 120,
        "devVOS": [{
          "scheduleId": "106",
          "scheduleNumber": "sche190810102745335",
          "planNo": "prod190723163919539",
          "componentCode": '2018cswl',
          "componentName": '2018cswl',
          "productValue": 120,
          "workVOS": [{
            "time": "2019-06-15 00:00:00",
            planned_start:'2019-06-15 00:00:00',
            planned_end:'2019-06-20 00:00:00',
            "days": 3,
            "scheduled": getRandomInt(100,600),
            "noscheduled": 0,
            "rate": parseFloat((Math.random()*1).toFixed(2))
          }]
        }]
      }]
    };
    let pro02 = {
      "procedureId": "31",
      "procedureName": "去毛刺",
      "sort":2,
      "timeVOS": [{
        "devId": 74,
        "devName": "去毛刺机02",
        "capacityValue": 500,
        "devVOS": []
      }, {
        "devId": 73,
        "devName": "去毛刺机01",
        "capacityValue": 500,
        "devVOS": [{
          "scheduleId": "103",
          "scheduleNumber": "sche190731152049759",
          "planNo": "prod190723164406062",
          "componentCode": 'C82342C001',
          "componentName": 'C82342C001',
          "productValue": 500,
          "workVOS": [{
            "time": "2019-06-18 00:00:00",
            planned_start:'2019-06-18 00:00:00',
            planned_end:'2019-06-23 00:00:00',
            "days": 3,
            "scheduled": getRandomInt(100,600),
            "noscheduled": 0,
            "rate": parseFloat((Math.random()*1).toFixed(2))
          }]
        }, {
          "scheduleId": "106",
          "scheduleNumber": "sche190810102745335",
          "planNo": "prod190723163919539",
          "componentCode": 'C82342C001',
          "componentName": 'C82342C001',
          "productValue": 500,
          "workVOS": [{
            "time": "2019-06-18 00:00:00",
            planned_start:'2019-06-18 00:00:00',
            planned_end:'2019-06-23 00:00:00',
            "days": 2,
            "scheduled": getRandomInt(100,600),
            "noscheduled": 0,
            "rate": parseFloat((Math.random()*1).toFixed(2))
          }]
        }]
      }]
    };
    let pro03 = {
      "procedureId": "32",
      "procedureName": "热处理",
      "sort":3,
      "timeVOS": [{
        "devId": 76,
        "devName": "热处理炉02",
        "capacityValue": 1000,
        "devVOS": []
      }, {
        "devId": 75,
        "devName": "热处理炉01",
        "capacityValue": 1000,
        "devVOS": [{
          "scheduleId": "106",
          "scheduleNumber": "sche190810102745335",
          "planNo": "prod190723163919539",
          "componentCode": 'Cycz0002',
          "componentName": 'Cycz0002',
          "productValue": 1000,
          "workVOS": [{
            "time": "2019-06-19 00:00:00",
            planned_start:'2019-06-19 00:00:00',
            planned_end:'2019-06-23 00:00:00',
            "days": 3,
            "scheduled": getRandomInt(100,600),
            "noscheduled": 0,
            "rate": parseFloat((Math.random()*1).toFixed(2))
          }]
        }]
      }]
    }
    let pro04 = {
      "procedureId": "33",
      "procedureName": "抛丸",
      "sort":4,
      "timeVOS": [{
        "devId": 77,
        "devName": "抛丸机01",
        "capacityValue": 1000,
        "devVOS": [{
          "scheduleId": "106",
          "scheduleNumber": "sche190810102745335",
          "planNo": "prod190723163919539",
          "componentCode": 'Cycz0001',
          "componentName": 'Cycz0001',
          "productValue": 1000,
          "workVOS": [{
            "time": "2019-06-23 00:00:00",
            planned_start:'2019-06-23 00:00:00',
            planned_end:'2019-06-24 00:00:00',
            "days": 3,
            "scheduled": getRandomInt(100,1000),
            "noscheduled": 0,
            "rate": parseFloat((Math.random()*1).toFixed(2))
          }]
        }]
      }]
    };
    let pro05 = {
      "procedureId": "34",
      "procedureName": "CNC",
      "sort":5,
      "timeVOS": [{
        "devId": 80,
        "devName": "CNC03",
        "capacityValue": 150,
        "devVOS": [{
          "scheduleId": "106",
          "scheduleNumber": "sche190810102745335",
          "planNo": "prod190723163919539",
          "componentCode": 'C81132B023',
          "componentName": 'C81132B023',
          "productValue": 150,
          "workVOS": [{
            "time": "2019-06-27 00:00:00",
            planned_start:'2019-06-27 00:00:00',
            planned_end:'2019-06-29 00:00:00',
            "days": 2,
            "scheduled": getRandomInt(100,500),
            "noscheduled": 0,
            "rate": parseFloat((Math.random()*1).toFixed(2))
          }]
        }]
      }, {
        "devId": 79,
        "devName": "CNC02",
        "capacityValue": 150,
        "devVOS": [{
          "scheduleId": "106",
          "scheduleNumber": "sche190810102745335",
          "planNo": "prod190723163919539",
          "componentCode": 'C81132B023',
          "componentName": 'C81132B023',
          "productValue": 150,
          "workVOS": [{
            "time": "2019-06-27 00:00:00",
            planned_start:'2019-06-27 00:00:00',
            planned_end:'2019-06-29 00:00:00',
            "days": 2,
            "scheduled": getRandomInt(100,500),
            "noscheduled": 0,
            "rate": parseFloat((Math.random()*1).toFixed(2))
          }]
        }]
      }, {
        "devId": 78,
        "devName": "CNC01",
        "capacityValue": 150,
        "devVOS": [{
          "scheduleId": "106",
          "scheduleNumber": "sche190810102745335",
          "planNo": "prod190723163919539",
          "componentCode": 'C81132B023',
          "componentName": 'C81132B023',
          "productValue": 150,
          "workVOS": [{
            "time": "2019-06-27 00:00:00",
            planned_start:'2019-06-27 00:00:00',
            planned_end:'2019-06-29 00:00:00',
            "days": 2,
            "scheduled": getRandomInt(100,500),
            "noscheduled": 0,
            "rate": parseFloat((Math.random()*1).toFixed(2))
          }]
        }]
      }]
    };
    let pro06 = {
      "procedureId": "35",
      "procedureName": "立式加工",
      "sort":6,
      "timeVOS": [{
        "devId": 81,
        "devName": "立式加工中心01",
        "capacityValue": 130,
        "devVOS": [{
          "scheduleId": "106",
          "scheduleNumber": "sche190810102745335",
          "planNo": "prod190723163919539",
          "componentCode": 'C81131B012',
          "componentName": 'C81131B012',
          "productValue": 150,
          "workVOS": [{
            "time": "2019-07-01 00:00:00",
            planned_start:'2019-07-01 00:00:00',
            planned_end:'2019-07-03 00:00:00',
            "days": 3,
            "scheduled": getRandomInt(100,500),
            "noscheduled": 0,
            "rate": parseFloat((Math.random()*1).toFixed(2))
          }]
        }]
      }]
    }
    let pro07 = {
      "procedureId": "36",
      "procedureName": "检测气密性",
      "sort":7,
      "timeVOS": [{
        "devId": 83,
        "devName": "气密性设备02",
        "capacityValue": 300,
        "devVOS": [{
          "scheduleId": "106",
          "scheduleNumber": "sche190810102745335",
          "planNo": "prod190723163919539",
          "componentCode": 'Cycz0012',
          "componentName": 'Cycz0012',
          "productValue": 150,
          "workVOS": [{
            "time": "2019-07-03 00:00:00",
            planned_start:'2019-07-03 00:00:00',
            planned_end:'2019-07-05 00:00:00',
            "days": 3,
            "scheduled": getRandomInt(100,500),
            "noscheduled": 0,
            "rate": parseFloat((Math.random()*1).toFixed(2))
          }]
        }]
      }, {
        "devId": 82,
        "devName": "气密性设备01",
        "capacityValue": 300,
        "devVOS": [{
          "scheduleId": "106",
          "scheduleNumber": "sche190810102745335",
          "planNo": "prod190723163919539",
          "componentCode": 'Cycz0012',
          "componentName": 'Cycz0012',
          "productValue": 150,
          "workVOS": [{
            "time": "2019-07-03 00:00:00",
            planned_start:'2019-07-03 00:00:00',
            planned_end:'2019-07-05 00:00:00',
            "days": 3,
            "scheduled": getRandomInt(100,600),
            "noscheduled": 0,
            "rate": parseFloat((Math.random()*1).toFixed(2))
          }]
        }]
      }]
    };
    let pro08 = {
      "procedureId": "37",
      "procedureName": "清洗",
      "sort":8,
      "timeVOS": [{
        "devId": 84,
        "devName": "清洗机01",
        "capacityValue": 1000,
        "devVOS": [{
          "scheduleId": "106",
          "scheduleNumber": "sche190810102745335",
          "planNo": "prod190723163919539",
          "componentCode": 'Cys1012',
          "componentName": 'Cys1012',
          "productValue": 150,
          "workVOS": [{
            "time": "2019-07-06 00:00:00",
            planned_start:'2019-07-06 00:00:00',
            planned_end:'2019-07-08 00:00:00',
            "days": 2,
            "scheduled": getRandomInt(100,500),
            "noscheduled": 0,
            "rate": parseFloat((Math.random()*1).toFixed(2))
          }]
        }]
      }]
    };
    let pro09 = {
      "procedureId": "38",
      "procedureName": "涂装",
      "sort":9,
      "timeVOS": [{
        "devId": 85,
        "devName": "喷涂线01",
        "capacityValue": 1000,
        "devVOS": [{
          "scheduleId": "106",
          "scheduleNumber": "sche190810102745335",
          "planNo": "prod190723163919539",
          "componentCode": 'C81132B23l',
          "componentName": 'C81132B23l',
          "productValue": 150,
          "workVOS": [{
            "time": "2019-07-08 00:00:00",
            planned_start:'2019-07-08 00:00:00',
            planned_end:'2019-07-10 00:00:00',
            "days": 2,
            "scheduled": getRandomInt(100,500),
            "noscheduled": 0,
            "rate": parseFloat((Math.random()*1).toFixed(2))
          }]
        }]
      }]
    };
    let pro010 = {
      "procedureId": "39",
      "procedureName": "包装",
      "sort":10,
      "timeVOS": [{
        "devId": 95,
        "devName": "包装",
        "capacityValue": 500,
        "devVOS": [{
          "scheduleId": "106",
          "scheduleNumber": "sche190810102745335",
          "planNo": "prod190723163919539",
          "componentCode": 'C81132B23d',
          "componentName": 'C81132B23d',
          "productValue": 1000,
          "workVOS": [{
            "time": "2019-07-10 00:00:00",
            planned_start:'2019-07-11 00:00:00',
            planned_end:'2019-07-12 00:00:00',
            "days": 2,
            "scheduled": getRandomInt(100,1000),
            "noscheduled": 0,
            "rate": parseFloat((Math.random()*1).toFixed(2))
          }]
        }]
      }]
    };
    let workList = [
      {
        /* 压铸 */
        workNumber:'work1906181712',
        cateCode:'2018cswl',
        scheData:[pro01]
      },{
        /* 去毛刺  */
        workNumber:'work1906151200',
        cateCode:'C82342C001',
        scheData:[pro02]
      },{
        /* 热处理  */
        workNumber:'work1906190911',
        cateCode:'Cycz0002',
        scheData:[pro03]
      },{
        /* 抛丸  */
        workNumber:'work1906231231',
        cateCode:'Cycz0001',
        scheData:[pro04]
      },{
        /* CNC  */
        workNumber:'work1906271123',
        cateCode:'C81132B023',
        scheData:[pro05]
      },{
        /* 立式加工  */
        workNumber:'work1907011223',
        cateCode:'C81131B012',
        scheData:[pro06]
      },{
        /* 气密性  */
        workNumber:'work1907031021',
        cateCode:'Cycz0012',
        scheData:[pro07]
      },{
        /* 清洗  */
        workNumber:'work1907061902',
        cateCode:'Cys1012',
        scheData:[pro08]
      },{
        /* 涂装  */
        workNumber:'work1907081930',
        cateCode:'C81132B23l',
        scheData:[pro09]
      },{
        /* 包装  */
        workNumber:'work1907101910',
        cateCode:'C81132B23d',
        scheData:[pro010]
      }
    ]
    let res = {
      data:{
        code:1,
        data:workList
      }
    };
  return res
}

export function inspectServerInfo(){
  return {"code":0,"data":{"id":70,"maintainType":1,"content":"测试点检内容01","contentType":2,"must":true,"parentId":0,"creater":"jinmj","createTime":"2019-09-27 21:36:44","items":[{"configDetailDO":{"id":153,"configId":70,"item":"测试选项01","cascades":true,"sort":1,"companyId":1},"configVOs":[{"id":85,"maintainType":1,"content":"字段01","contentType":1,"must":false,"parentId":70,"detailId":153,"creater":"jinmj","createTime":"2019-09-27 21:36:44","items":[{"configDetailDO":{"id":154,"configId":85,"item":"102","cascades":false,"sort":1,"companyId":1}},{"configDetailDO":{"id":155,"configId":85,"item":"201","cascades":false,"sort":2,"companyId":1}}]}]},{"configDetailDO":{"id":156,"configId":70,"item":"测试选项02","cascades":false,"sort":2,"companyId":1}}]}}
}

export function maintainDetail(){
  return {"code":0,"data":[{"id":1,"type":1,"content":"轮轴转速时多少","contentType":1,"contentTypeDesc":"数字输入型","must":true,"parentId":0,"creater":"admin","createTime":"2019-10-30 13:50:58","tenantId":"1","items":[{"configDetailDO":{"id":22,"configId":1,"content":"21","configStands":false,"cascades":false,"sort":1,"tenantId":"1"}},{"configDetailDO":{"id":23,"configId":1,"content":"50","configStands":false,"cascades":false,"sort":2,"tenantId":"1"}}]},{"id":4,"type":1,"content":"轮轴机油颜色","contentType":2,"contentTypeDesc":"单选型","parentId":0,"creater":"admin","createTime":"2019-10-31 10:25:13","tenantId":"1","items":[{"configDetailDO":{"id":42,"configId":4,"content":"深黄色","configStands":false,"cascades":true,"sort":1,"tenantId":"1"},"configVOs":[{"id":13,"type":1,"content":"轮轴压力是否正常","contentType":2,"contentTypeDesc":"单选型","must":false,"parentId":4,"detailId":42,"createTime":"2019-10-31 10:25:13","tenantId":"1","items":[{"configDetailDO":{"id":43,"configId":13,"content":"正常","configStands":false,"cascades":false,"sort":1,"tenantId":"1"}},{"configDetailDO":{"id":44,"configId":13,"content":"不正常","configStands":false,"cascades":false,"sort":2,"tenantId":"1"}}]}]},{"configDetailDO":{"id":45,"configId":4,"content":"淡黄色","configStands":false,"cascades":false,"sort":2,"tenantId":"1"}},{"configDetailDO":{"id":46,"configId":4,"content":"黄色","configStands":false,"cascades":false,"sort":3,"tenantId":"1"}}]},{"id":6,"type":1,"content":"轮轴表面污渍","contentType":4,"contentTypeDesc":"文本输入型","parentId":0,"creater":"admin","createTime":"2019-10-30 13:51:49","tenantId":"1"},{"id":9,"type":1,"content":"轮轴材料构成","contentType":3,"contentTypeDesc":"多选型","must":true,"parentId":0,"creater":"admin","createTime":"2019-10-30 22:10:19","tenantId":"1","items":[{"configDetailDO":{"id":34,"configId":9,"content":"碳","configStands":false,"cascades":true,"sort":1,"tenantId":"1"},"configVOs":[{"id":11,"type":1,"content":"白色","contentType":2,"contentTypeDesc":"单选型","must":false,"parentId":9,"detailId":34,"createTime":"2019-10-30 22:10:19","tenantId":"1","items":[{"configDetailDO":{"id":35,"configId":11,"content":"白1","configStands":false,"cascades":false,"sort":1,"tenantId":"1"}},{"configDetailDO":{"id":36,"configId":11,"content":"白2","configStands":false,"cascades":false,"sort":2,"tenantId":"1"}}]},{"id":12,"type":1,"content":"黑色","contentType":3,"contentTypeDesc":"多选型","must":false,"parentId":9,"detailId":34,"createTime":"2019-10-30 22:10:19","tenantId":"1","items":[{"configDetailDO":{"id":37,"configId":12,"content":"黑1","configStands":false,"cascades":false,"sort":1,"tenantId":"1"}},{"configDetailDO":{"id":38,"configId":12,"content":"黑2","configStands":false,"cascades":false,"sort":2,"tenantId":"1"}}]}]},{"configDetailDO":{"id":39,"configId":9,"content":"钛合金","configStands":false,"cascades":false,"sort":2,"tenantId":"1"}},{"configDetailDO":{"id":40,"configId":9,"content":"铁合金","configStands":false,"cascades":false,"sort":3,"tenantId":"1"}},{"configDetailDO":{"id":41,"configId":9,"content":"铁","configStands":false,"cascades":false,"sort":4,"tenantId":"1"}}]},{"id":10,"type":1,"content":"轮轴表面现象","contentType":5,"contentTypeDesc":"上传图片型","must":false,"parentId":0,"creater":"admin","createTime":"2019-10-30 17:06:12","tenantId":"1"}]}
}



	/* 设置递归 */
const setChildren = (data,type)=>{
		let list = []
		for(let item of data){
			if(type){
				if(item.finalBomDo){
					if(item.finalBomDo.forwards.length > 0 ){
							let childList = []
							for(let value of item.finalBomDo.forwards){
								if(value.finalBomDo){
									let child = {...omit(value,'forwards'),...value.finalBomDo.bomDo}
									if(value.finalBomDo.forwards.length > 0 ){
											child.children = this.setChildren(value.finalBomDo.forwards,type)
									}
									childList.push(child)
								}
							}
							if(childList.length > 0){
									item.children = childList
							}
							list.push({...item,...item.finalBomDo.bomDo})
					}else{
							list.push({...omit(item,'forwards'),...item.finalBomDo.bomDo})
					}
				}
			}else{
				if(item['reverse']){
					if(item['reverse'].finalBomDos.length > 0 ){
							let childList = []
							for(let value of item['reverse'].finalBomDos){
								if(value['reverse']){
									let child = {...omit(value,'reverse'),...value.bomDo,...value['reverse'],}
									if(value['reverse'].finalBomDos.length > 0 ){
											child.children = this.setChildren(value['reverse'].finalBomDos,type)
									}
									childList.push(child)
								}else{
									childList.push({...value.bomDo})
								}
							}
							if(childList.length > 0){
									item.children = childList
							}
							list.push({...item,...item.bomDo,reviews:item['reverse'].reviews})
					}else{
						list.push({...omit(item,'reverse'),...item.finalBomDos.bomDo})
					}
				}else{
					list.push({...item.bomDo})
				}
			}
		}
		return list
}