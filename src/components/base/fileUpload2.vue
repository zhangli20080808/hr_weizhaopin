<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="uploadUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="successd"
      :on-error="uploadError"
      :data="param"

      :file-list="fileList">
      <el-button type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">不能上传/exe/com/cgi/asp/php/jsp文件</div>
    </el-upload>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  /*
   param => businessId:业务ID，1.组织；2.职务；3.职位；4.用户；5.头像;6.工作汇报；7.公告；8:草稿；9:审批
   fId => 关联ID (businessId:6-9的时候为-1)
   file-list-edit =>编辑的时候传进来的file数组,必须包含fileName,id,url[{fileName;"xxxx.jpg",id:"1",url:"https://hr.ecbao.cn/upload/upload1234.jpg"}]
   fileId => 上传成功后传出去的id
   deleFileId => 删除成功后传出去的id
   empty => 传值进来清空上传列表(新增专用)
   */
  import Util from '../../common/js/util.js';
  import md5 from 'js-md5';
  import tips from './tips.vue';
  export default {
    props:{
      param:Object,
      fileListEdit:Array,
      empty:String
    },
    name:'fileUpload',
    data() {
      return {
        fileList: this.fileListEdit?this.fileListEdit:[],
        uploadUrl:Util.uploadURLForCommon,
        params:{
          param:JSON.stringify(this.param),
          sign:md5('method'+"fileUpload/insertFileRecord"+"param"+JSON.stringify(this.param)+"ecbao")
        },
        dialogVisible:false,
        dialogImageUrl:'',

      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file,fileList)
        var _this = this;
        var method = "fileUpload/delFileRecord";
        var param = JSON.stringify({id:file.response.data.ids});
        var successd = function (res) {
          _this.$emit('deleFileId',file.response.data.ids)
        }
        _this.$http(method,param,successd);
      },
      handlePreview(file) {
        if(file.raw.type.indexOf('image') != -1){
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        }

      },
      successd(response,file,fileList){
        var _this = this;
        console.log(response,file,fileList);
        if (response.code == 0) {
          _this.$emit('fileId2',response.data.ids);
          if(_this.param.businessId<5){
            _this.fileList.pop();
          }
        } else {
          _this.fileList.pop();
          _this.$message.error(response.message);
        }
      },
      // 上传错误
      uploadError (response, file, fileList) {
        console.log('上传失败，请重试！')
      },
    },
    watch: {
      fileListEdit: {
        handler: function(n, o){

        },
        deep: true
      },
      empty:function() {
        this.fileList = [];//清空
      }
    },
    components:{
      tips
    }
  }
</script>
<style>

</style>
