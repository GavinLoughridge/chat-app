(function() {
  'use strict'

  angular.module('app')
    .component('posts', {
      controller: controller,
      templateUrl: '/posts/posts.html'
    })

  function controller($firebaseArray, $firebaseAuth, $window) {
    const vm = this

    vm.$onInit = function () {

      var container = angular.element( document.querySelector( '.container' ) );
      container.css('height', $window.innerHeight);

      vm.selectedPost = '😀'
      var auth = $firebaseAuth()

      auth.$signInAnonymously().then(function(authData) {
        var ref = firebase.database().ref().child('posts')

        vm.posts = $firebaseArray(ref)
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    }

    vm.addPost = function() {
      vm.posts.$add({
        text: vm.selectedPost,
        views: 0,
        created: new Date().getTime()
      });
    };

    vm.viewPost = function(e, post) {
      e.preventDefault()
      console.log(post);
      let update = vm.posts.$getRecord(post.$id)
      update.views += 1
      vm.posts.$save(update)
    }
  }
}());
