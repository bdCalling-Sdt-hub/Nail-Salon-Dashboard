
import { Button } from "antd";
import { useNotificationQuery } from "../../redux/apiSlices/DashboardHomeApi";
import moment from "moment";


const Notification = () => { 
  const {data } = useNotificationQuery() 

  return (
    <div className="mt-5">
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
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
              Notifications
            </h3>
          </div>
        </div>
        <div> 
          {
            data?.data?.notifications?.map((value , index)=> {
              return(
                <div key={index}
            style={{   
              margin: "16px 0",
              alignItems: "center",
              backgroundColor:  "transparent" ,
              height: "80px",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.10)",
              padding: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <p
                style={{
                  display: "flex",
                  gap: "40px",
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#555555",
                  }}
                >
                 {value?.title}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: "#A7A7A7",
                  }}
                > 
                {
 moment(value?.createdAt).format('MMM D YYYY, h:mm a')
                }
               
                </span>
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: "#818181",
                }}
              >
               {value?.text}
              </p>
            </div>
           
        </div> 
              )
            }
            
          )}
         
        </div>
      </div>
    </div>
  );
};

export default Notification;
