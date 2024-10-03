import styled from "styled-components";
export const HomePageStyle = styled.div`
  #customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  #customers td,
  #customers th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  #customers tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  #customers tr:hover {
    background-color: #ddd;
  }

  #customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04aa6d;
    color: white;
  }
  & img {
    width: 120px;
    height: 120px;
  }
  .modal {
    background-color: #869890;
  }

  & .btn {
    color: #fff;
    background: #1677ff;
    box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
    height: 32px;
    padding: 4px 15px;
    border-radius: 6px;
    border: 1px solid transparent;
    margin: 0px 15px;
    & .FaEdit {
      font-size: 20px;
    }
  }
  & .btn_to {
    color: #fff;
    background: #ff4d4f;
    box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
    height: 32px;
    padding: 4px 15px;
    border-radius: 6px;
    border: 1px solid transparent;
    margin: 0px 15px;
    & .MdDeleteForever {
      font-size: 20px;
    }
  }

  /* =========================LOGINPAGE============= */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  & .form_contaner {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 330px;
    height: 330px;
    background-color: #fafafa;
    border-radius: 0.75rem;
    box-shadow: 0 4px 10px #0000001a;
    border: 1px solid rgb(241, 241, 241);
    & .IoPersonOutline {
      color: gray;
      position: absolute;
      top: 83px;
      left: 40px;
      font-size: 19px;
    }
    & .PiLockKeyLight {
      color: gray;
      position: absolute;
      top: 143px;
      left: 40px;
      font-size: 19px;
    }
    & .input_field {
      border: 1px solid #878c94;
      border-radius: 0.375rem;
      width: 270px;
      height: 50px;
      margin-top: 0.75rem;
      outline: none;
      padding-left: 35px;
      font-size: 12px;
      transition: border-color 0.3s ease;
    }
    & .submir_btn {
      width: 270px;
      height: 50px;
      background-color: #2f4574;
      color: #fff;
      text-align: center;
      border: none;
      border-radius: 0.375rem;
      margin-top: 45px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  }
`;
