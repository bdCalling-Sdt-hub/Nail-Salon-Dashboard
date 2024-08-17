import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import {
  useGetAboutDataQuery,
  useUpdateDataMutation,
} from "../../../redux/apiSlices/AboutApi";

const About = () => {
  const editor = useRef(null);
  const [content, setContent] = useState(null);
  const [isLoading, seLoading] = useState(false);

  const { data, refetch } = useGetAboutDataQuery();
  // console.log(data);
  const [updateData, { data: updateDatas }] = useUpdateDataMutation();

  const config = {
    readonly: false,
    placeholder: "Start typings...",
    style: {
      height: 400,
    },
  };

  useEffect(() => {
    setContent(data?.data?.content);
  }, [data?.data?.content]);

  const handleSubmit = async () => {
    await updateData({ content: content }).then((res) => {
      // console.log(res); 
      if (res?.data?.statusCode === 200) {
        if (updateDatas) {
          Swal.fire({
            title: "About Updated!",
            text: "Your about has been update.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => refetch());
        }
      } else {
        Swal.fire({
          title: "Oops",
          text: res?.error?.data?.message,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "16px 0",
        }}
      >
        <div>
          <h3
            style={{
              color: "#6A5ECC",
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            About Us
          </h3>
        </div>
        <div></div>
      </div>
      <div>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          // onChange={(newContent) => {}}
        />
      </div>
      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => handleSubmit()}
          style={{
            height: 44,
            width: 150,
            backgroundColor: "#6A5ECC",
            color: "white",
            borderRadius: "8px",
            fontWeight: 500,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Save Changes
        </button>
      </div>
    </>
  );
};

export default About;
