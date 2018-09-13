<template>
  <div>
    <h1>무한스크롤 테스트지롱</h1>
    <ul v-for="(item, index) in list" :key="index">
      Line:
      <li><button @click="goDetail()">{{item}}</button></li>
    </ul>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

export default {
  data() {
    return {
      list: [],
    };
  },
  components: {
    InfiniteLoading,
  },
  methods: {
    // infiniteHandler 기본 제공 함수
    infiniteHandler($state) {
      setTimeout(() => {
        const temp = [];
        for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
          temp.push(i);
        }
        this.list = this.list.concat(temp);
        localStorage.setItem('oldList', this.list);
        $state.loaded();
      }, 1000);
    },
    // 스크롤 위치 값알아내는 함수
    getScrollXY() {
      var scrOfX = 0, scrOfY = 0;
      if( typeof( window.pageYOffset ) == 'number' ) {
        //Netscape compliant
        scrOfY = window.pageYOffset;
        scrOfX = window.pageXOffset;
      } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        //DOM compliant
        scrOfY = document.body.scrollTop;
        scrOfX = document.body.scrollLeft;
      } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
        scrOfX = document.documentElement.scrollLeft;
      }
      return { x:scrOfX, y:window.scrollY };
    },
    // 상세 라우터 이동하는 함수
    goDetail() {
      this.$router.push('/cardDetail');
      localStorage.setItem('scrollPosition', this.getScrollXY().y);
      localStorage.setItem('buttonClicked', true);
    }
  },
  mounted() {
    // dom mount 되었을때 버튼클릭 확인하는 로직
    if(localStorage.getItem('buttonClicked') !== 'true') {
      return;
    }
    if(localStorage.getItem('oldList')) {
      this.list = localStorage.getItem('oldList').split(',');
      // mouse 이동후 지워라
      // 초기화 시점에대한 제어 필요.
      // localStorage.removeItem('oldList');
      localStorage.removeItem('buttonClicked');      
    }
  },
  updated() {
    // 데이터 변화가 감지된후의 시점에 대한 처리들
    if(localStorage.getItem('scrollPosition')) {
      window.scrollTo(0, localStorage.getItem('scrollPosition'));
    }
    localStorage.removeItem('scrollPosition');
  },
  destroyed() {
    console.log('is destoryed???');
  },
  watch: {
    '$route'(to, from) {
      console.log(to, from);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
