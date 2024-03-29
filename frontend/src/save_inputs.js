import { saveAs } from "file-saver";

export function collect_inputs() {
  var inp_json = {};

  if (document.getElementsByName("rc_checkbox")[0].checked) {
    inp_json["external_diameter"] = parseFloat(
      document.getElementsByName("round_canopy_exdia")[0].value
    );
    inp_json["skirt_width"] = parseFloat(
      document.getElementsByName("round_canopy_skwdt")[0].value
    );
    inp_json["number_of_suspension_lines"] = parseFloat(
      document.getElementsByName("round_canopy_n_susplines")[0].value
    );
    inp_json["number_of_slots"] = parseFloat(
      document.getElementsByName("round_canopy_n_slot")[0].value
    );
    inp_json["conical_height"] = parseFloat(
      document.getElementsByName("round_canopy_conhg")[0].value
    );
    inp_json["drawing_2d"] = {
      file_name: "/work/drawing.dxf"
    };
    inp_json["drawing_2d"]["sewing_allowance"] = {
      panel_rear_percentc: parseFloat(
        document.getElementsByName("rc_panels_sap_rear")[0].value
      ),
      max_value: parseFloat(
        document.getElementsByName("rc_sa_max_value")[0].value
      ),
      min_value: parseFloat(
        document.getElementsByName("rc_sa_min_value")[0].value
      ),
      panel_sides_percentc: parseFloat(
        document.getElementsByName("rc_panels_sap_sides")[0].value
      ),
      panel_front_percentc: parseFloat(
        document.getElementsByName("rc_panels_sap_front")[0].value
      )
    };
    inp_json["number_of_panel"] = parseFloat(
      document.getElementsByName("round_canopy_n_panels")[0].value
    );
    inp_json["suspension_length"] = parseFloat(
      document.getElementsByName("round_canopy_susplen")[0].value
    );
    inp_json["transform_geometry"] = {
      rotation: {
        angle: document
          .getElementsByName("rc_rot_angle")[0]
          .value.split(",")
          .map(function(x) {
            return parseFloat(x);
          })
      },
      translation: document
        .getElementsByName("rc_translation")[0]
        .value.split(",")
        .map(function(x) {
          return parseFloat(x);
        })
    };
    inp_json["slot_width"] = parseFloat(
      document.getElementsByName("round_canopy_sw")[0].value
    );
    inp_json["ring_diameter"] = parseFloat(
      document.getElementsByName("round_canopy_ringdia")[0].value
    );
    inp_json["mesh_parameters"] = {
      edge_length_percentc: parseFloat(
        document.getElementsByName("rc_mp_el")[0].value
      )
    };

    return inp_json;
  }

  var planform_user_defined = document.getElementsByName(
    "planform_user_define"
  );
  var chord_length_percent = [];
  for (let i = 0; i < planform_user_defined.length; i++) {
    let cur = planform_user_defined[i].value.split(",").map(function(x) {
      return parseFloat(x);
    });
    chord_length_percent.push(cur);
  }

  inp_json["planform_description"] = {
    max_chord_length: parseFloat(
      document.getElementsByName("planform_chord")[0].value
    ),
    spanwise_chord_length_percentc: chord_length_percent,
    shape: document.getElementsByName("planform_plftype")[0].value,
    span_length: parseFloat(
      document.getElementsByName("planform_span")[0].value
    )
  };

  inp_json["number_of_panel"] = parseFloat(
    document.getElementsByName("planform_total_ribs")[0].value
  );

  inp_json["rib_description"] = {
    LE_cut: {
      angle_with_chord_line: parseFloat(
        document.getElementsByName("airfoil_acl")[0].value
      ),
      chord_length_percentc: parseFloat(
        document.getElementsByName("airfoil_clp")[0].value
      )
    },
    lightening_holes: [
      {
        shape: "ELLIPTIC",
        box_index: 0,
        minor_to_major_axes: 0.7,
        size: 5
      },
      {
        shape: "TRIANGULAR",
        box_index: 1,
        minor_to_major_axes: 0.7
      }
    ],
    aerofoil: "/solverMain/test/airfoil.txt",
    tape_V_angle: 20
  };

  inp_json["volute_description"] = {
    shape: "ELLIPTIC",
    semi_span_angle: parseFloat(
      document.getElementsByName("volute_input_ssa")[0].value
    ),
    minor_to_major_axes: parseFloat(
      document.getElementsByName("volute_input_minot_ratio")[0].value
    )
  };

  inp_json["drawing_2d"] = {
    file_name: "/work/drawing.dxf",
    sewing_allowance: {
      panel_rear_percentc: parseFloat(
        document.getElementsByName("flat_panels_sap_rear")[0].value
      ),
      max_value: parseFloat(
        document.getElementsByName("flat_panels_sa_max_value")[0].value
      ),
      min_value: parseFloat(
        document.getElementsByName("flat_panels_sa_min_value")[0].value
      ),
      rib_rear_percentc: parseFloat(
        document.getElementsByName("flat_panels_sar_rear")[0].value
      ),
      rib_front_percentc: parseFloat(
        document.getElementsByName("flat_panels_sar_front")[0].value
      ),
      panel_front_percentc: parseFloat(
        document.getElementsByName("flat_panels_sap_front")[0].value
      ),
      panel_sides_percentc: parseFloat(
        document.getElementsByName("flat_panels_sap_sides")[0].value
      ),
      rib_sides_percentc: parseFloat(
        document.getElementsByName("flat_panels_sar_sides")[0].value
      )
    }
  };

  let al = document.getElementsByName("ribs_connection");
  let al_value;
  for (let i = 0; i < al.length; i++) {
    if (al[i].checked) al_value = al[i].value;
  }

  let udrs = [1, 3, 8, 13];

  if (al_value == "USER_DEFINED") {
    udrs = document
      .getElementsByName("user_defined_ribs")[0]
      .value.split(",")
      .map(function(x) {
        return parseInt(x) - 1;
      });
  }

  inp_json["anchor_description"] = [
    {
      rib_connection: al_value,
      riser_length: parseFloat(
        document.getElementsByName("rla_cl_susplen")[0].value
      ),
      chordwise_locations_percentc: document
        .getElementsByName("rla_cl_location")[0]
        .value.split(",")
        .map(function(x) {
          return parseFloat(x, 10);
        }),
      distance_between_karabinas: parseFloat(
        document.getElementsByName("advip_others_dkl")[0].value
      ),
      user_defined_ribs: udrs,
      riser_end_separation_length: 400.0
    }
  ];

  if (document.getElementsByName("is_rla_l1")[0].checked) {
    let rla_l1 = {};
    rla_l1["L1_length_percentl"] = parseFloat(
      document.getElementsByName("rla_l1_length")[0].value
    );
    let usrl1 = [];
    let inpsl1 = document.getElementsByName("rla_l1_inputs");
    for (let i = 0; i < inpsl1.length; i++) {
      let cur = inpsl1[i].value.split(",").map(function(x) {
        return parseFloat(x);
      });
      usrl1.push(cur);
    }
    rla_l1["L1_combination"] = usrl1;
    Object.assign(inp_json["anchor_description"][0], rla_l1);
  }

  if (document.getElementsByName("is_rla_l2")[0].checked) {
    let rla_l2 = {};
    rla_l2["L2_length_percentl"] = parseFloat(
      document.getElementsByName("rla_l2_length")[0].value
    );
    let usrl2 = [];
    let inpsl2 = document.getElementsByName("rla_l2_inputs");
    for (let i = 0; i < inpsl2.length; i++) {
      let cur = inpsl2[i].value.split(",").map(function(x) {
        return parseFloat(x);
      });
      usrl2.push(cur);
    }
    rla_l2["L2_combination"] = usrl2;
    Object.assign(inp_json["anchor_description"][0], rla_l2);
  }

  let br = document
    .getElementsByName("bl_brake_ribs")[0]
    .value.split(",")
    .map(function(x) {
      return x;
    });
  inp_json["brake_line_description"] = {
    user_defined_ribs: br,
    enable_generation: true
  };

  if (document.getElementsByName("is_bl_l1")[0].checked) {
    let bl_l1 = {};
    bl_l1["L1_length_percentl"] = parseFloat(
      document.getElementsByName("bl_l1_length")[0].value
    );
    let usrl1 = [];
    let inpsl1 = document.getElementsByName("bl_l1_inputs");
    for (let i = 0; i < inpsl1.length; i++) {
      let cur = inpsl1[i].value.split(",").map(function(x) {
        return parseFloat(x);
      });
      usrl1.push(cur);
    }
    bl_l1["L1_combination"] = usrl1;
    Object.assign(inp_json["brake_line_description"], bl_l1);
  }

  if (document.getElementsByName("is_bl_l2")[0].checked) {
    let bl_l2 = {};
    bl_l2["L1_length_percentl"] = parseFloat(
      document.getElementsByName("bl_l2_length")[0].value
    );
    let usrl2 = [];
    let inpsl2 = document.getElementsByName("bl_l2_inputs");
    for (let i = 0; i < inpsl2.length; i++) {
      let cur = inpsl2[i].value.split(",").map(function(x) {
        return parseFloat(x);
      });
      usrl2.push(cur);
    }
    bl_l2["L1_combination"] = usrl2;
    Object.assign(inp_json["brake_line_description"], bl_l2);
  }

  inp_json["side_flap_description"] = {
    rear_edge_length_percentl: parseFloat(
      document.getElementsByName("advip_sfd_rel")[0].value
    ),
    start_line_index: parseFloat(
      document.getElementsByName("advip_sfd_index")[0].value
    ),
    front_edge_length_percentl: parseFloat(
      document.getElementsByName("advip_sfd_fel")[0].value
    ),
    enable_generation: true
  };
  inp_json["wash_out_description"] = {
    user_defined_angle: [-10, -8, -6, -4, -2, -1],
    center_of_rotation_percentc: parseFloat(
      document.getElementsByName("advip_washout_description_cr")[0].value
    ),
    variation: document.getElementsByName(
      "advip_washout_description_variation"
    )[0].value,
    tip_angle: parseFloat(
      document.getElementsByName("advip_washout_description_ta")[0].value
    )
  };
  inp_json["slider"] = {
    percent_area: parseFloat(
      document.getElementsByName("advip_slider_ap")[0].value
    ),
    width_length_ratio: parseFloat(
      document.getElementsByName("advip_slider_wlr")[0].value
    )
  };
  inp_json["transform_geometry"] = {
    rotation: {
      angle: document
        .getElementsByName("advip_tg_ra")[0]
        .value.split(",")
        .map(function(x) {
          return parseFloat(x, 10);
        })
    },
    translation: document
      .getElementsByName("advip_tg_ta")[0]
      .value.split(",")
      .map(function(x) {
        return parseFloat(x, 10);
      })
  };

  return inp_json;
}

export function save_input() {
  var input = collect_inputs();
  input = JSON.stringify(input, null, 4);
  var input_blob = new Blob([input], { type: "text/plain;charset=utf-8" });
  saveAs(input_blob, "input.scf");
}

function merge_inputs(inp_json) {
  if (!inp_json.hasOwnProperty("planform_description")) {
    document.getElementsByName("rc_checkbox")[0].checked = true;
    document.getElementsByName("round_canopy_n_panels")[0].value =
      inp_json["number_of_panel"];
    document.getElementsByName("round_canopy_n_susplines")[0].value =
      inp_json["number_of_suspension_lines"];
    document.getElementsByName("round_canopy_n_slot")[0].value =
      inp_json["number_of_slots"];
    document.getElementsByName("round_canopy_exdia")[0].value =
      inp_json["external_diameter"];
    document.getElementsByName("round_canopy_ringdia")[0].value =
      inp_json["ring_diameter"];
    document.getElementsByName("round_canopy_sw")[0].value =
      inp_json["slot_width"];
    document.getElementsByName("round_canopy_susplen")[0].value =
      inp_json["suspension_length"];
    document.getElementsByName("round_canopy_conhg")[0].value =
      inp_json["conical_height"];
    document.getElementsByName("round_canopy_skwdt")[0].value =
      inp_json["skirt_width"];
    document.getElementsByName("rc_sa_max_value")[0].value =
      inp_json["drawing_2d"]["sewing_allowance"]["max_value"];
    document.getElementsByName("rc_sa_min_value")[0].value =
      inp_json["drawing_2d"]["sewing_allowance"]["min_value"];
    document.getElementsByName("rc_panels_sap_sides")[0].value =
      inp_json["drawing_2d"]["sewing_allowance"]["panel_sides_percentc"];
    document.getElementsByName("rc_panels_sap_front")[0].value =
      inp_json["drawing_2d"]["sewing_allowance"]["panel_front_percentc"];
    document.getElementsByName("rc_panels_sap_rear")[0].value =
      inp_json["drawing_2d"]["sewing_allowance"]["panel_rear_percentc"];
    document.getElementsByName("rc_rot_angle")[0].value = inp_json[
      "transform_geometry"
    ]["rotation"]["angle"].join();
    document.getElementsByName("rc_translation")[0].value = inp_json[
      "transform_geometry"
    ]["translation"].join();
    document.getElementsByName("rc_mp_el")[0].value =
      inp_json["mesh_parameters"]["edge_length_percentc"];

    return
  }

  document.getElementsByName("planform_total_ribs")[0].value =
    inp_json["number_of_panel"];
  document.getElementsByName("planform_chord")[0].value =
    inp_json["planform_description"]["max_chord_length"];
  document.getElementsByName("planform_span")[0].value =
    inp_json["planform_description"]["span_length"];
  document.getElementsByName("planform_plftype")[0].value =
    inp_json["planform_description"]["shape"];
  if (inp_json["planform_description"]["shape"] == "USER_DEFINED") {
    let cur =
      inp_json["planform_description"]["spanwise_chord_length_percentc"];
    let inputs = document.getElementsByName("planform_user_define");
    for (let i = 0; i < cur.length; i++) {
      let a = inputs[i];
      if (a) {
        a.value = cur[i].join();
      } else {
        let inp_node = document.createElement("input");
        inp_node.setAttribute("type", "text");
        inp_node.setAttribute("name", "planform_user_define");
        document.getElementById("user_defined_planform").appendChild(inp_node);
        inp_node.setAttribute("value", cur[i].join());
      }
    }
    if (cur.length < inputs.length) {
      let diff = inputs.length - cur.length;
      for (let i = 0; i < diff; i++) {
        document
          .getElementById("user_defined_planform")
          .removeChild(
            document.getElementById("user_defined_planform").lastChild
          );
      }
    }
  }

  document.getElementsByName("airfoil_clp")[0].value =
    inp_json["rib_description"]["LE_cut"]["chord_length_percentc"];
  document.getElementsByName("airfoil_acl")[0].value =
    inp_json["rib_description"]["LE_cut"]["angle_with_chord_line"];

  document.getElementsByName("volute_input_minot_ratio")[0].value =
    inp_json["volute_description"]["minor_to_major_axes"];
  document.getElementsByName("volute_input_ssa")[0].value =
    inp_json["volute_description"]["semi_span_angle"];

  document.getElementsByName("flat_panels_sa_max_value")[0].value =
    inp_json["drawing_2d"]["sewing_allowance"]["max_value"];
  document.getElementsByName("flat_panels_sa_min_value")[0].value =
    inp_json["drawing_2d"]["sewing_allowance"]["min_value"];
  document.getElementsByName("flat_panels_sar_sides")[0].value =
    inp_json["drawing_2d"]["sewing_allowance"]["rib_sides_percentc"];
  document.getElementsByName("flat_panels_sar_front")[0].value =
    inp_json["drawing_2d"]["sewing_allowance"]["rib_front_percentc"];
  document.getElementsByName("flat_panels_sar_rear")[0].value =
    inp_json["drawing_2d"]["sewing_allowance"]["rib_rear_percentc"];
  document.getElementsByName("flat_panels_sap_front")[0].value =
    inp_json["drawing_2d"]["sewing_allowance"]["panel_front_percentc"];
  document.getElementsByName("flat_panels_sap_rear")[0].value =
    inp_json["drawing_2d"]["sewing_allowance"]["panel_rear_percentc"];
  document.getElementsByName("flat_panels_sap_sides")[0].value =
    inp_json["drawing_2d"]["sewing_allowance"]["panel_sides_percentc"];

  if (inp_json["anchor_description"][0]["rib_connection"] == "ALL")
    document.getElementsByName("ribs_connection")[0].checked = true;
  else if (inp_json["anchor_description"][0]["rib_connection"] == "ALTERNATE")
    document.getElementsByName("ribs_connection")[1].checked = true;
  else if (
    inp_json["anchor_description"][0]["rib_connection"] == "USER_DEFINED"
  ) {
    document.getElementsByName("ribs_connection")[2].checked = true;
    document.getElementsByName("user_defined_ribs")[0].value = inp_json[
      "anchor_description"
    ][0]["user_defined_ribs"].join();
  }

  document.getElementsByName("rla_cl_location").value = inp_json[
    "anchor_description"
  ][0]["chordwise_locations_percentc"].join();
  document.getElementsByName("rla_cl_susplen").value =
    inp_json["anchor_description"][0]["riser_length"];
  document.getElementsByName("advip_others_dkl").value =
    inp_json["anchor_description"][0]["distance_between_karabinas"];

  if (inp_json["anchor_description"][0].hasOwnProperty("L1_length_percentl")) {
    document.getElementsByName("is_rla_l1")[0].checked = true;
    document.getElementsByName("rla_l1_length")[0].value =
      inp_json["anchor_description"][0]["L1_length_percentl"];
    let cur = inp_json["anchor_description"][0]["L1_combination"];
    let inputs = document.getElementsByName("rla_l1_inputs");
    for (let i = 0; i < cur.length; i++) {
      let a = inputs[i];
      if (a) {
        a.value = cur[i].join();
      } else {
        let inp_node = document.createElement("input");
        inp_node.setAttribute("type", "text");
        inp_node.setAttribute("name", "rla_l1_inputs");
        document.getElementById("l1_rla").appendChild(inp_node);
        inp_node.setAttribute("value", cur[i].join());
      }
    }
    if (cur.length < inputs.length) {
      let diff = inputs.length - cur.length;
      for (let i = 0; i < diff; i++) {
        document
          .getElementById("l1_rla")
          .removeChild(document.getElementById("l1_rla").lastChild);
      }
    }
  }

  if (inp_json["anchor_description"][0].hasOwnProperty("L2_length_percentl")) {
    document.getElementsByName("is_rla_l2")[0].checked = true;
    document.getElementsByName("rla_l2_length")[0].value =
      inp_json["anchor_description"][0]["L2_length_percentl"];
    let cur = inp_json["anchor_description"][0]["L2_combination"];
    let inputs = document.getElementsByName("rla_l2_inputs");
    for (let i = 0; i < cur.length; i++) {
      let a = inputs[i];
      if (a) {
        a.value = cur[i].join();
      } else {
        let inp_node = document.createElement("input");
        inp_node.setAttribute("type", "text");
        inp_node.setAttribute("name", "rla_l2_inputs");
        document.getElementById("l2_rla").appendChild(inp_node);
        inp_node.setAttribute("value", cur[i].join());
      }
    }
    if (cur.length < inputs.length) {
      let diff = inputs.length - cur.length;
      for (let i = 0; i < diff; i++) {
        document
          .getElementById("l2_rla")
          .removeChild(document.getElementById("l2_rla").lastChild);
      }
    }
  }

  document.getElementsByName("bl_brake_ribs")[0].value = inp_json[
    "brake_line_description"
  ]["user_defined_ribs"].join();

  if (inp_json["brake_line_description"].hasOwnProperty("L1_length_percentl")) {
    document.getElementsByName("is_bl_l1")[0].checked = true;
    document.getElementsByName("bl_l1_length")[0].value =
      inp_json["brake_line_description"]["L1_length_percentl"];
    let cur = inp_json["brake_line_description"]["L1_combination"];
    let inputs = document.getElementsByName("bl_l1_inputs");
    for (let i = 0; i < cur.length; i++) {
      let a = inputs[i];
      if (a) {
        a.value = cur[i].join();
      } else {
        let inp_node = document.createElement("input");
        inp_node.setAttribute("type", "text");
        inp_node.setAttribute("name", "bl_l1_inputs");
        document.getElementById("l1_bl").appendChild(inp_node);
        inp_node.setAttribute("value", cur[i].join());
      }
    }
    if (cur.length < inputs.length) {
      let diff = inputs.length - cur.length;
      for (let i = 0; i < diff; i++) {
        document
          .getElementById("l1_bl")
          .removeChild(document.getElementById("l1_bl").lastChild);
      }
    }
  }

  if (inp_json["brake_line_description"].hasOwnProperty("L2_length_percentl")) {
    document.getElementsByName("is_bl_l2")[0].checked = true;
    document.getElementsByName("bl_l2_length")[0].value =
      inp_json["brake_line_description"]["L2_length_percentl"];
    let cur = inp_json["brake_line_description"]["L2_combination"];
    let inputs = document.getElementsByName("bl_l2_inputs");
    for (let i = 0; i < cur.length; i++) {
      let a = inputs[i];
      if (a) {
        a.value = cur[i].join();
      } else {
        let inp_node = document.createElement("input");
        inp_node.setAttribute("type", "text");
        inp_node.setAttribute("name", "bl_l2_inputs");
        document.getElementById("l2_bl").appendChild(inp_node);
        inp_node.setAttribute("value", cur[i].join());
      }
    }
    if (cur.length < inputs.length) {
      let diff = inputs.length - cur.length;
      for (let i = 0; i < diff; i++) {
        document
          .getElementById("l2_bl")
          .removeChild(document.getElementById("l2_bl").lastChild);
      }
    }
  }

  document.getElementsByName("advip_washout_description_ta")[0].value =
    inp_json["washout_description"]["tip_angle"];
  document.getElementsByName("advip_washout_description_cr")[0].value =
    inp_json["washout_description"]["center_of_rotation_percentc"];
  document.getElementsByName("advip_washout_description_variation")[0].value =
    inp_json["washout_description"]["variation"];
  document.getElementsByName("ud_wo_variation")[0].value = inp_json[
    "washout_description"
  ]["user_defined_angle"].join();

  document.getElementsByName("advip_sfd_rel")[0].value =
    inp_json["side_flap_description"]["rear_edge_length_percentl"];
  document.getElementsByName("advip_sfd_fel")[0].value =
    inp_json["side_flap_description"]["front_edge_length_percentl"];
  document.getElementsByName("advip_sfd_index")[0].value =
    inp_json["side_flap_description"]["start_line_index"];

  document.getElementsByName("advip_tg_ra")[0].value = inp_json[
    "transform_geometry"
  ]["rotation"]["angle"].join();
  document.getElementsByName("advip_tg_ta")[0].value = inp_json[
    "transform_geometry"
  ]["translation"].join();

  document.getElementsByName("advip_slider_ap")[0].value =
    inp_json["slider"]["percent_area"];
  document.getElementsByName("advip_slider_wlr")[0].value =
    inp_json["slider"]["width_length_ratio"];
}

export function load_input(blob) {
  var project_file = new FileReader();
  project_file.addEventListener("load", function() {
    merge_inputs(JSON.parse(project_file.result));
  });
  project_file.readAsText(blob, "UTF-8");
}
