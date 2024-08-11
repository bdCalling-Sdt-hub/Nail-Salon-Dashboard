import { useEffect, useRef, useState } from "react";
import { Dropdown, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { RiLoader3Fill } from "react-icons/ri";

const data = [
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
  {
    key: "#1239",

    salon: {
      name: "SalonName",
      img: "https://s3-alpha-sig.figma.com/img/9981/2fa6/de64ff3c2b2cbcffedeb70e70fd4ee1f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mulldky38Z9YUkDaXyd8vYmagSChyfKr2j3pf3VLy6DVIHPo~Xqy9hwz9w7g4nGFftp4NO5Q-S2cE3ylCypdwadk2ulCX9CfnTNRyIKw0YhAkEwUHD6WblZ5ZFDWvjGhTrSlHnozKBn-Pu1UeZkxQFsHROSltQ2sXCPPdUf-tWfBX1xVX1Oell4m-970KBCdw~G3PWAj7V6RpxVpWBybNOIiR160hPrhzxGFmwqiMJWepFMzvf36Bd8NK-VWZlk6AuQavoMY18Z3WNJwk2bEVxhuyYA5ZbE~QuaY3TKAmPe-Q4sGy8Pf~kqnCFxArK8du84HjxgGEOZaaK37FKIhcA__",
    },
    service: "Nail Art",
    service_name: "Braids",
    location: "Corona, Michigan",
    prize: "100€",
  },
];

const SalonDetailsList = () => {
  const [category, setCategory] = useState("location");
  const [page, setPage] = useState(
    new URLSearchParams(window.location.search).get("page") || 1
  );

  const dropdownRef = useRef();
  const items = [
    {
      label: "Car",
      key: "Car",
    },
    {
      label: "Bike",
      key: "Bike",
    },
    {
      label: "Cycle",
      key: "Cycle",
    },
  ];

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDate(false);
        setOpen("");
        setFilter(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Salon",
      dataIndex: "salon",
      key: "salon",
      render: (salon) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <img
              style={{
                height: 48,
                width: 48,
                borderRadius: 8,
                backgroundSize: "cover",
              }}
              src={salon?.img}
              alt="ok"
            />
            <p
              style={{
                letterSpacing: 0.4,
                fontSize: "#666666",
                fontWeight: "400",
              }}
            >
              {salon?.name}
            </p>
          </div>
        );
      },
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },

    {
      title: "Service Name",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Prize",
      dataIndex: "prize",
      key: "prize",
    },
  ];

  const handlePageChange = (page) => {
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const onClick = ({ key }) => {
    setCategory(key);
    const params = new URLSearchParams(window.location.search);
    params.set("category", key);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const onSelect = (newValue) => {
    const date = newValue.format("MMM-DD-YYYY");
    setValue(date);
    const params = new URLSearchParams(window.location.search);
    params.set("date", date);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  return (
    <div>
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
              Salons Services
            </h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "115px",
                height: "40px",
                borderRadius: "8px",
                border: "1px solid #E9E9E9",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "15px",
                color: "#8B8B8B",
                fontSize: 14,
              }}
            >
              {category}
              <Dropdown menu={{ items, onClick }}>
                <p
                  style={{
                    cursor: "pointer",
                    color: "#717171",
                    borderRadius: "4px",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  <DownOutlined
                    style={{ paddingLeft: "18px" }}
                    color="#717171"
                  />
                </p>
              </Dropdown>
            </div>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                border: "1px solid #E9E9E9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "5px 8px",
                color: "#F2F2F2",
                cursor: "pointer",
                background: "#F27405",
              }}
            >
              <RiLoader3Fill size={20} />
            </div>
          </div>
        </div>
        <div>
          <Table
            columns={columns}
            style={{}}
            dataSource={data}
            pagination={{
              pageSize: 10,
              defaultCurrent: parseInt(page),
              onChange: handlePageChange,
              total: 85,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} out of ${total}`,
              defaultPageSize: 20,
              //   defaultCurrent: 1,
              style: {
                marginBottom: 20,
                marginLeft: 20,
                marginRight: 20,
                width: "100%",
                display: "flex",
                // gap: 10,
                // justifyContent: "space-between",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SalonDetailsList;
