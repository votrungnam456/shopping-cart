import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Title from "../../../components/dashboard/Title";
const ReviewManagement = () => {
  const dispatch = useDispatch();
  const storeAdmin = useSelector((state) => state.admin);
  const reviewsList = storeAdmin.reviewsList;
  const calculateRating = (reviewList) => {
    let rating = 0;
    if (reviewList.length > 0) {
      reviewList.forEach((review) => {
        rating += review.rating;
      });
      rating = (rating / reviewList.length).toFixed(1);
    }
    return rating;
  };
  return (
    <>
      <div>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 0 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Title>Quản lý bình luận đánh giá sản phẩm</Title>
                <div className="overflow-y-scroll max-h-[250px]">
                  <Table size="small">
                    <TableHead className="sticky top-0">
                      <TableRow>
                        <TableCell className="min-w-[125px]">
                          Tên sản phẩm
                        </TableCell>
                        <TableCell className="min-w-[125px]">
                          Số lượng bình luận
                        </TableCell>
                        <TableCell>Trung bình đánh giá</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {reviewsList?.map((review, index) => (
                        <TableRow
                          className="hover:bg-gray-200 cursor-pointer"
                          key={index}
                        >
                          <TableCell>{review.productName}</TableCell>
                          <TableCell>{review.reviews?.length ?? 0}</TableCell>
                          <TableCell>
                            {calculateRating(review.reviews)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default ReviewManagement;
