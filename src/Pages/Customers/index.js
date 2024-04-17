import { Avatar, Rate, Space, Table, Typography, List } from "antd";
import { useEffect, useState } from "react";
// import { getCustomers, getInventory } from "../../API";
import axios from "axios";

function Bills() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [users, setUsers] = useState([]);
  let index = 0;

  //Chia page
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = Math.ceil(dataSource.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = dataSource.slice(startIndex, endIndex);

  useEffect(() => {
    getBills();
    console.log(currentData);
  }, []);

  const getBills = async () => {
    setLoading(true);
    setTimeout(async () => {
      let data = '';

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3030/api/v1/bill',
        headers: {},
        data: data
      };

      await axios.request(config)
        .then((response) => {
          setDataSource(response.data.data);
          console.log(response.data.data)
          setLoading(false);
          // getUsers();
          // console.log(dataSource);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500);


  }

  const getUsers = async () => {
    let data = '';

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/user/',
      headers: {},
      data: data
    };

    await axios.request(config)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  const columns = [

    // {
    //   title: 'Id',
    //   dataIndex: '_id',
    //   key: '_id',
    //   render: (record) => {
    //     return <>{index++}</>
    //   }
    // },
    {
      title: 'Tài Khoản',
      dataIndex: 'userId',
      key: 'userId',
      render: (userId) => {
        return <>{userId.username}</>
      }
    },
    {
      title: "Phim",
      dataIndex: "xuatChieuId",
      key: 'xuatChieuId',
      render: (xuatChieuId) => {
        return <>{xuatChieuId.movieID.name}</>
      }
    },
    {
      title: "Số Ghế Đặt",
      dataIndex: "seat",
      key: 'seat',
      render: (seat) => {
        return <>{seat}</>
      }
    },
    {
      title: "Thời Điểm Đặt",
      dataIndex: "createdAt",
      key: 'createdAt',
      render: (createdAt) => {
        return <>{createdAt}</>
      }
    },
    // {
    //   title: "Số lượng ghế",
    //   dataIndex: "seat",
    //   // render: (seat) => {
    //   //   return(
    //   //     <span>
    //   //       {seat.length()}
    //   //     </span>
    //   //   )
    //   // }
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    // },

  ]

  return (
    <>
      <Typography.Title level={4}>Danh sách vé đã đặt</Typography.Title>
      <List size={20} direction="vertical">
        {/* <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 10,
            current: currentPage,
            onChange: (page) => setCurrentPage(page),
          }}
          rowKey={(record) => record._id}
        ></Table> */}
        <Table
          loading={loading} // Replace with your loading state
          columns={columns}
          dataSource={currentData}
          pagination={{
            pageSize: 5,
          }}
          rowKey={(record) => record._id} // Adjust based on your data structure
        ></Table>
      </List>
    </>
  );
}
export default Bills;
