/*
 * @Author: lijing
 * @Date: 2023-2-17 15:00:00
 * @LastEditors: zhongzhuof.vendor
 * @LastEditTime:
 * @Descripttion: 图片 store
 */
import { defineStore } from 'pinia';
import { getPictures, getParks, getDevices } from '@/api/picture';
import { getCounterSetting } from '@/api/setting';
import dayjs from 'dayjs';

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'picture',
  // state: 返回对象的函数
  state: () => ({
    pictures: [], // 展示用的picture数据
    parks: [], // 公园信息
    devices: [], //  设备信息
    searchData: {
      // time: 'all', // TODO: 时间, 默认设置什么？
      startTime: 0,
      endTime: 0,
      parkCode: null, // 公园名称
      deviceIds: [], // 设备名称
      pageSize: 10, // 每页显示多少个
      pageNum: 1 // TODO: 从1开始
    },
    total: 0,
    selectedPhotos: [],
    defaultSetting: {},
    // showPrintPrompt: false,
    // showPromptText: '',
    printStatus: false,
    claimStatus: false,
    imgIdArray: [],
    claimParams: {},
    claimModeRemainingTimes: 0
  }),

  actions: {
    setPictures(val) {
      this.pictures = val;
    },
    setParks(val) {
      this.parks = val;
    },
    setDevices(val) {
      this.devices = val;
    },
    setSearchData(val) {
      this.searchData = val;
    },
    setSelectedPhotos(val) {
      this.selectedPhotos = [...val];
    },
    async fetchImages() {
      let params = {};
      Object.keys(this.searchData).forEach((key) => {
        if (!!this.searchData[key] && JSON.stringify(this.searchData[key]) !== '[]') {
          params[key] = this.searchData[key];
        }
      });
      try {
        let res = await getPictures(params);
        if (params.pageNum === 1) {
          this.pictures = res.data || [];
        } else {
          const existingIndex = this.pictures.findIndex((el) => el.imageId === res.data[0].imageId);
          if (existingIndex !== -1) {
            this.pictures = this.pictures.slice(0, existingIndex).concat(res.data);
          } else {
            this.pictures = this.pictures.concat(res.data || []);
          }
        }
        this.total = res.total;
      } catch (error) {}
    },
    async initPark() {
      try {
        let res = await getParks();
        this.parks =
          res.map((el) => ({
            label: el.name,
            value: el.code
          })) || [];
      } catch (error) {
        this.parks = [];
      }
    },
    async initDevice() {
      try {
        const park = this.searchData.parkCode || 'FerrariWorld';
        let res = await getDevices(park);
        // 去掉disable的设备
        this.devices =
          res
            .filter((el) => el.deviceStatus !== 2)
            .map((el) => ({
              label: el.deviceName,
              value: el.deviceId
            })) || [];
      } catch (error) {
        this.devices = [];
      }
    },
    async initDefault(counter) {
      const counterId = counter || localStorage.getItem('counter');
      if (!counterId) return;
      try {
        this.defaultSetting = await getCounterSetting(counterId);
        // if (!localStorage.getItem('printerHttps')) {
        //   window.open(`https://${this.defaultSetting.eightPrinter}/print`)
        //   window.open(`https://${this.defaultSetting.tenPrinter}/print`)
        //   localStorage.setItem('printerHttps', true)
        // }
      } catch (error) {
        console.error('get counter setting error', error);
      }
    },
    // setPrintPrompt(val) {
    //   //提示进入打印模式
    //   switch (val) {
    //     case 1:
    //       this.showPromptText = 'Admin Print Mode Activated';
    //       break;
    //     case 2:
    //       this.showPromptText = 'Admin Print Mode Deactivated';
    //       break;
    //     case 3:
    //       this.showPromptText = 'Print Successful';
    //       break;
    //     default:
    //       this.showPromptText = 'Print Failed';
    //       break;
    //   }
    //   this.showPrintPrompt = true;
    //   setTimeout(() => {
    //     this.showPrintPrompt = false;
    //   }, 2000);
    // },
    setPrintStatus(val) {
      this.printStatus = val;
    },
    setClaimStatus(val) {
      this.claimStatus = val;
    },
    setClaimModeRemainingTimes(val) {
      this.claimModeRemainingTimes = val;
    },
    setClaimParams(val) {
      this.claimParams = { ...this.claimParams, ...val };
    },
    setImgIdArray(val) {
      if (!this.imgIdArray.includes(val)) {
        this.imgIdArray.push(val);
      }
    },
    initImgIdArray() {
      this.imgIdArray = [];
    },
    clearPrintParams() {
      this.imgIdArray = [];
      this.claimParams = {};
      this.claimModeRemainingTimes = 0;
    }
  }
});
