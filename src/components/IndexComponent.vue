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
                <th>Item Names</th>
                <th>Item Prices </th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts" :key="post.id">
                    <td>{{ post.name }}</td>
                    <td>{{ post.email }}</td>
                    <td>{{ post.password }}</td>
                    <td><router-link :to="{name: 'edit', params: { id: post.id }}" class="btn btn-primary">Edit</router-link></td>
                    <td><button class="btn btn-danger" @click.prevent="deletePost(post.id)">Delete</button></td>
                </tr>
            </tbody>
        </table>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
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
                    <input type="text" class="form-control" id="inputEmail4" v-model="project.schedule" placeholder="Name of Project">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword41">Periode</label>
                        <vue-monthly-picker
                      v-model="project.schedule" id="inputPassword41">
                    </vue-monthly-picker>
                  </div>
                </div>
                <hr/>
                
                <div id="content">
                        <div id="ValuWrapper"> 
                          <div class="form-row">
                            <div class="form-group col-md-5">   
                              <label for="inputPlace">Place to Go</label>
                              <input type="text" class="form-control" id="inputPlace" placeholder="Where you go ? Jambi, Riau or ">
                            </div>
                            <div class="form-group col-md-5">
                              <label for="inputDate">When??</label>
                              <!-- <date-range-picker class="form-control" v-model="range" id="inputDate"/> -->
                                <input type="text" class="form-control" id="inputDate" name="datefilter" placeholder="Select Date" value="">
                            </div>
                            <div class="form-group col-md-2">                            
                              <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-success add">Add More</button>
                                
                              </div>
                            </div>                           
                          </div>
                        </div>
                      </div>

                <div id="add_field">
                </div>
                
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save Project</button>
              </div>
            </div>
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
          posts: [], // ini untuk menampung data semua user yang didapat dari API
          project:{} // ini untuk menampung data project
        }
      },
      created() {
      let uri = `http://192.168.10.60:8000/api/alluser`;
      this.axios.get(uri, 
      {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.posts = response.data.user.data
        console.log(this.posts)
      })
    },
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
        $('.form-row:last').after(`<div class="form-row asd">
                            <div class="form-group col-md-5">   
                              <label for="inputPlace">Place to Go</label>
                              <input type="text" class="form-control" id="inputPlace" placeholder="Where you go ? Jambi, Riau or ">
                            </div>
                            <div class="form-group col-md-5">
                                <label for="inputDate">When??</label>
                                <input type="text" class="form-control" id="inputDate" name="datefilter" placeholder="Select Date" value="">                            </div>
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
      $('#ValuWrapper').on('click','.del',function() {
         $(this).fadeOut("1000", function(){
        $(this).parent().parent().parent().remove();
      });     
    });
});
</script>
