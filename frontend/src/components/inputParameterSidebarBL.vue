<template>
  <div class="custom_modal" id="brake_lines_modal" v-bind:class="{pop_up_toggle : input_toggle}">
    <div class="card bg-light input_popup">
      <div class="card-header">
        <h5>
          Brake Lines
          <span v-on:click="input_toggle = !input_toggle">&times;</span>
        </h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col">
            <p>Brake Ribs</p>
          </div>
          <div class="col">
            <input type="text" value="2,5,7,10" name="bl_brake_ribs" style="width: 100%" />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 card">
            <div class="card-body user_define">
              <span>L1 Combination</span>
              <input type="checkbox" name="is_bl_l1" style="width:20%;" v-model="bl_l1" />
              <br />
              <div v-bind:class="{disabledDiv:!bl_l1}">
                <span>L1 Length</span>
                <input type="text" name="bl_l1_length" value="20" style="width:20%;" />
                <div class="custom_user_define_inputs" id="l1_bl">
                  <input type="text" value="0,1" name="bl_l1_inputs" />
                  <input type="text" value="2,3" name="bl_l1_inputs" />
                </div>
                <div class="user_define_add_remove_buttons">
                  <button
                    type="button"
                    class="btn btn-sm btn-secondary"
                    v-on:click="remove_l1_user_define"
                  >Remove</button>
                  <button
                    type="button"
                    class="btn btn-sm btn-secondary"
                    v-on:click="add_l1_user_define"
                  >Add</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 card">
            <div class="card-body user_define">
              <span>L2 Combination</span>
              <input type="checkbox" name="is_bl_l2" style="width:20%;" v-model="bl_l2" />
              <br />
              <div v-bind:class="{disabledDiv:!bl_l2}">
                <span>L2 Length</span>
                <input type="text" name="bl_l2_length" value="20" style="width:20%;" />
                <div class="custom_user_define_inputs" id="l2_bl">
                  <input type="text" value="1,2,4" name="bl_l2_inputs" />
                  <input type="text" value="3,5,8" name="bl_l2_inputs" />
                </div>
                <div class="user_define_add_remove_buttons">
                  <button
                    type="button"
                    class="btn btn-sm btn-secondary"
                    v-on:click="remove_l2_user_define"
                  >Remove</button>
                  <button
                    type="button"
                    class="btn btn-sm btn-secondary"
                    v-on:click="add_l2_user_define"
                  >Add</button>
                </div>
              </div>
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
      bl_l1: '',
      bl_l2: ''
    };
  },
  methods: {
    add_l1_user_define: function() {
      let inp_node = document.createElement("input");
      inp_node.setAttribute("type", "text");
      inp_node.setAttribute("name", "bl_l1_inputs");
      document.getElementById("l1_bl").appendChild(inp_node);
    },
    remove_l1_user_define: function() {
      let last_child = document.getElementById("l1_bl").lastChild;
      document.getElementById("l1_bl").removeChild(last_child);
    },
    add_l2_user_define: function() {
      let inp_node = document.createElement("input");
      inp_node.setAttribute("type", "text");
      inp_node.setAttribute("name", "bl_l2_inputs");
      document.getElementById("l2_bl").appendChild(inp_node);
    },
    remove_l2_user_define: function() {
      let last_child = document.getElementById("l2_bl").lastChild;
      document.getElementById("l2_bl").removeChild(last_child);
    }
  },
  created() {
    EventBus.$on(
      "input_param_brake_lines_got_clicked",
      input_param_brake_lines_flag => {
        this.input_toggle = input_param_brake_lines_flag;
      }
    );
  }
};
</script>