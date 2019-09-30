// IndexComponent.vue

<template>
  <div class="tes">
    
    
        <div class="row">
          <div class="col-md-10"> <h1>Simple Table </h1></div>
          <div class="col-md-2">
            <!-- <router-link :to="{ name: 'create' }" class="btn btn-primary">Create Post</router-link> -->
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              Add Project
            </button>
          </div>
        </div><br />

        <table class="table table-hover">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name Project</th>
                <th>Month</th>
                <th>Responsible</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts" :key="post.id">
                    <td>{{ post.id }}</td>
                    <td>{{ post.name_of_project }}</td>
                    <td>{{ post.schedule_month }}</td>
                    <td>{{ post.schedule_email }}</td>
                    <td><router-link :to="{name: 'edit', params: { id: post.id }}" class="btn btn-primary">Edit</router-link></td>
                    <td><button class="btn btn-danger" @click.prevent="deletePost(post.id)">Delete</button></td>
                </tr>
            </tbody>
        </table>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <form @submit.prevent="addProject">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              
              <div class="modal-body">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputEmail4">Name of Project</label>
                    <input type="text" class="form-control" id="inputEmail4" v-model="project.name_of_project" placeholder="Name of Project">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword41">Periode</label>
                        <vue-monthly-picker
                      v-model="project.schedule_month" id="inputPassword41">
                    </vue-monthly-picker>
                  </div>
                  <!-- untuk mendapatkan data email didalam localStorage -->
                    <input v-model="project.schedule_email = email" type="hidden" class="form-control"> 
                </div>
                <hr/>
                
                <div id="content">
                        <div id="ValuWrapper"> 
                          <div class="form-row">
                            <div class="form-group col-md-5">   
                              <label for="inputPlace">Place to Go</label>
                              <input type="text" class="form-control" v-model="project.schedule_place[0]"  id="inputPlace" placeholder="Where you go ? Jambi, Riau or ">
                            </div>
                            <div class="form-group col-md-5">
                              <label for="inputDate">When??</label>
                              <!-- <date-range-picker class="form-control" v-model="range" id="inputDate"/> -->
                              <div >
                                <input type="text" class="form-control" id="inputDate"  v-model="project.schedule_date_detail[0]" name="datefilter" placeholder="Select Date">
                                </div>
                            </div>
                            <div class="form-group col-md-2">                            
                              <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                                <!-- <label for="inputOpsi">Option</label> -->
                                <button type="button" class="btn btn-success add"  style="margin-top:35px;">Add More</button>
                              </div>
                            </div>                           
                          </div>
                          <div id="add_field">
                         </div>
                        </div>
                      </div>

                
              </div>
              
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save Project</button>
              </div>
            </div>
            </form>
          </div>
        </div>
        
  </div>
  
</template>

<script>
/* eslint-disable */
import VueMonthlyPicker from 'vue-monthly-picker';
// import Datepicker from 'vuejs-datepicker';
// import DatePicker from 'vue2-datepicker';
  export default {
      components: {
        VueMonthlyPicker,
        // Datepicker
      },
      data() {
        return {
          email: localStorage.getItem('email'),
          posts: [], // ini untuk menampung data semua user yang didapat dari API
          project:{
             schedule_date_detail: [],
             schedule_place: []
          }, // ini untuk menampung data project
        }
      },
      created() {
      let uri = `http://192.168.10.60:8000/api/schedules`;
      this.axios.get(uri, 
      {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.posts = response.data.data
        console.log(this.posts)
      })
    },
    methods: {
      addProject(){
         let uri = 'http://192.168.10.60:8000/api/schedule';
         
           this.axios.post(uri, this.project).then((response) => {
          //   // var token = response.data.token; // get token untuk nanti di store kedalam localStorage
          //   // var email = this.login.email;
          //   localStorage.setItem('token', token);
          //   localStorage.setItem('email', email);
          //  this.$router.push({name: 'posts'});
            console.log(this.project.schedule_place);
        });
      }
    }
  }

// Put Here For JS tambahan
$(function(){

//  Func JQuery daterangepicker.com
     $('input[name="datefilter"]').daterangepicker({
      autoUpdateInput: false,
      locale: {
          cancelLabel: 'Clear'
      }
    });

    $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    });

    $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });
    

// Func Add Field Baru
      $('.add').click(function() {
        $('#add_field').append(`<div class="form-row">
                            <div class="form-group col-md-5">   
                              <label for="inputPlace">Place to Go</label>
                              <input type="text" class="form-control" v-model="project.schedule_place[1]"  id="inputPlace" placeholder="Where you go ? Jambi, Riau or ">
                            </div>
                            <div class="form-group col-md-5">
                              <label for="inputDate">When??</label>
                              <!-- <date-range-picker class="form-control" v-model="range" id="inputDate"/> -->
                              <div >
                                <input type="text" class="form-control" id="inputDate"  v-model="project.schedule_date_detail[1]" name="datefilter" placeholder="Select Date">
                                </div>
                            </div>
                            <div class="form-group col-md-2">
                                <label for="inputOpsi">Option</label>
                                <div class="btn-group btn-group-sm" id="inputOpsi" role="group" aria-label="Basic example">  
                                  <button type="button" class="btn btn-danger del">Remove</button>
                                </div>
                            </div>                           
                         </div>`)
      $('input[name="datefilter"]').daterangepicker({
          autoUpdateInput: false,
          locale: {
              cancelLabel: 'Clear'
          }
        });
        $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
        });

        $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
        });
      });

// Func Remove Field Tambahan
      $('#add_field').on('click','.del',function() {
         $(this).fadeOut("1000", function(){
        $(this).parent().parent().parent().remove();
      });     
    });
});
</script>
