<template>
      <div class="resume-item">
           <div class="avatar">
              <img v-if="interviewerInfo.headImg" :src="interviewerInfo.headImg" alt="头像">
              <img v-else src="../../common/image/default_avatar2.png" alt="头像">
           </div>
           <div class="content">
              <div class="top-box">
                <div class="name">{{interviewerInfo.name}}
                  <img v-if="interviewerInfo.sex == 1" src="../../common/image/sex_male.png" alt="sex">
                  <img v-else src="../../common/image/sex_female.png" alt="sex">
                </div>
                <div class="state" :class="{'red-state':processStatus == '淘汰','gray-state':processStatus == '已入职'}">{{processStatus}}</div>

              </div>
              <div class="middle-box">
                <p class="base-info">
                  <span v-if="interviewerInfo.birthday">{{interviewerInfo.birthday | gloBirthday}}</span>
                  <span>{{interviewerInfo.educationLev | gloEducationLev}}</span>
                  <span v-if="interviewerInfo.workYear">{{interviewerInfo.workYear}}年</span></p>
              </div>
              <div class="bottom-box">
                <label class="label" for="">应聘</label>
                <span class="position-name">{{interviewerInfo.positionName}}</span>
              </div>
           </div>
        </div>
</template>

<script>
export default {
 props:['interviewerInfo','processStatus'], 
}
</script>

<style lang="less" scoped>
   @import '../css/resumeItem.less';
   
</style>


