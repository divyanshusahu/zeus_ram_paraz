<template>
  <div class="custom_modal" id="planform_modal" v-bind:class="{pop_up_toggle : input_toggle}">
    <div class="card bg-light input_popup">
      <div class="card-header">
        <h5>
          Planform Input
          <span v-on:click="input_toggle = !input_toggle">&times;</span>
        </h5>
      </div>
      <div class="card-body">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <p>Total Ribs</p>
            </div>
            <div class="col">
              <input type="number" value="28.0" name="planform_total_ribs" style="width: 100px">
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p>Platform Type</p>
            </div>
            <div class="col">
              <select name="planform_plftype" v-model="hide_user_define">
                <option value="RECTANGULAR">Rectangular</option>
                <option value="ELLIPTICAL">Elliptical</option>
                <option value="USER_DEFINED">User Define</option>
              </select>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col">
              <p>Span (mm)</p>
            </div>
            <div class="col">
              <input type="number" value="16180.0" name="planform_span" style="width: 100px">
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p>Chord (mm)</p>
            </div>
            <div class="col">
              <input type="number" value="5810.0" name="planform_chord" style="width: 100px">
            </div>
          </div>
          <br>
          <div class="user_define card" v-show="hide_user_define === 'USER_DEFINED'">
            <p>Spanwise chord length percent</p>
            <div class="custom_user_define_inputs" id="user_defined_planform">
              <input type="text" value="0,0,100" name="planform_user_define">
              <input type="text" value="10,0,100" name="planform_user_define">
              <input type="text" value="30,2,96" name="planform_user_define">
              <input type="text" value="50,5,90" name="planform_user_define">
              <input type="text" value="70,10,80" name="planform_user_define">
              <input type="text" value="100,18,64" name="planform_user_define">
            </div>
            <div class="user_define_add_remove_buttons">
              <button type="button" class="btn btn-secondary" v-on:click="remove_user_define">Remove</button>
              <button type="button" class="btn btn-secondary" v-on:click="add_user_define">Add</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button
          type="button"
          class="btn btn-success"
          v-on:click="input_toggle = !input_toggle"
        >Apply</button>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../main.js";
export default {
  data: function() {
    return {
      input_toggle: true,
      hide_user_define : "RECTANGULAR"
    };
  },
  methods: {
    add_user_define: function() {
      let inp_node = document.createElement("input");
      inp_node.setAttribute("type", "text");
      inp_node.setAttribute("name", "planform_user_define");
      document.getElementById("user_defined_planform").appendChild(inp_node);
    },
    remove_user_define: function() {
      let last_child = document.getElementById("user_defined_planform")
        .lastChild;
      document.getElementById("user_defined_planform").removeChild(last_child);
    }
  },
  created() {
    EventBus.$on(
      "input_param_planform_got_clicked",
      input_param_planform_flag => {
        this.input_toggle = input_param_planform_flag;
      }
    );
  }
};
</script>