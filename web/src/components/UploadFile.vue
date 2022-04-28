<template>
  <div class="hello">
    <div v-if="!isFileStatus">
      <h1>{{ upload }}</h1>
      <van-uploader :before-read="beforeRead" :after-read="afterRead">
        <van-button icon="plus" type="primary">{{ upload }}</van-button>
      </van-uploader>
    </div>
    <div class="down" v-if="isFileStatus">
      <h1>{{ download }}</h1>
      <van-button icon="down" type="primary" @click="downXlsx">{{
        download
      }}</van-button>
    </div>
  </div>
</template>

<script>
import { fileupload, downFile } from "@/api/file_api.js";
export default {
  name: "UploadFile",
  data() {
    return {
      upload: "文件上传",
      download: "文件下载",
      isFileType: false,
      isFileStatus: false,
    };
  },
  methods: {
    /**
     * 上传前判断文件格式
     */
    beforeRead(file) {
      if (
        file.type !=
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        this.$notify({ type: "danger", message: "上传文件格式有误" });
        return false;
      } else {
        this.isFileType = true;
        return true;
      }
    },
    afterRead(file) {
      if (!this.isFileType) return;
      this.$notify({ type: "primary", message: "上传中..." });
      console.log(file);
      let fileData = file.content;
      let formData = new FormData();
      formData.append("file", file.file);
      fileupload("/file/uploadXslx", formData)
        .then((res) => {
          this.$notify({ type: "success", message: "上传成功!" });
          console.log(res);
          this.isFileStatus = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    downXlsx() {
      downFile("/file/downloadXslx", {})
        .then((res) => {
          console.log(JSON.stringify(res));
          if (typeof res == 'undefined') return this.$notify({ type: "danger", message: "下载失败" });
          this.$notify({ type: "success", message: "下载成功!" });
          this.downloadFile(res);
        })
        .catch((err) => {
          console.log(err);
          this.$notify({ type: "danger", message: "下载失败" });
        });
    },
    downloadFile (data) {
      if (!data) {
        return
      }
      let blob = new Blob([data])
      let fileName = 'output.xlsx'
      if ('download' in document.createElement('a')) {
        let url = window.URL.createObjectURL(blob)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } else {
        window.navigator.msSaveBlob(blob, fileName)
      }
    }
  },
};
</script>

<style scoped>
.down {
  margin-top: 50px;
}
</style>
