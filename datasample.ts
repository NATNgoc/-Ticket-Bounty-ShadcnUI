import { Ticket, TicketStatus } from "@/features/ticket/type";

const dataTicketSamples: Ticket[] = [
  {
    id: 1,
    movieId: 101,
    startTime: new Date("2023-10-01T10:00:00"),
    endTime: new Date("2023-10-01T12:00:00"),
    isUsed: TicketStatus.NotUsed,
    description:
      "Trải nghiệm buổi sáng đầy thú vị với bộ phim hành động kịch tính. Đừng bỏ lỡ những cảnh quay tuyệt đẹp và những pha hành động nghẹt thở!",
  },
  {
    id: 2,
    movieId: 102,
    startTime: new Date("2023-10-01T13:00:00"),
    endTime: new Date("2023-10-01T15:00:00"),
    isUsed: TicketStatus.Used,
    description:
      "Bạn đã tham dự một buổi chiều đong đầy cảm xúc với câu chuyện tình yêu lãng mạn, nơi mọi khán giả đều rơi lệ vì sự xúc động.",
  },
  {
    id: 3,
    movieId: 103,
    startTime: new Date("2023-10-01T16:00:00"),
    endTime: new Date("2023-10-01T18:00:00"),
    isUsed: TicketStatus.NotUsed,
    description:
      "Một bộ phim giả tưởng hoành tráng vào buổi chiều tối! Cùng lạc vào thế giới đầy màu sắc và phép thuật sẽ làm bạn ngạc nhiên.",
  },
  {
    id: 4,
    movieId: 104,
    startTime: new Date("2023-10-01T19:00:00"),
    endTime: new Date("2023-10-01T21:00:00"),
    isUsed: TicketStatus.Used,
    description:
      "Bộ phim trinh thám gay cấn này đã giữ bạn ở mép ghế suốt hai giờ đồng hồ. Một kết thúc bất ngờ khiến ai cũng phải bàn tán.",
  },
  {
    id: 5,
    movieId: 105,
    startTime: new Date("2023-10-02T10:00:00"),
    endTime: new Date("2023-10-02T12:00:00"),
    isUsed: TicketStatus.NotUsed,
    description:
      "Hãy bắt đầu ngày mới bằng một bộ phim hoạt hình ngọt ngào, đầy sắc màu và phù hợp cho cả gia đình.",
  },
  {
    id: 6,
    movieId: 106,
    startTime: new Date("2023-10-02T13:00:00"),
    endTime: new Date("2023-10-02T15:00:00"),
    isUsed: TicketStatus.Used,
    description:
      "Buổi chiều ấn tượng với bộ phim kinh dị lạnh sống lưng. Những khoảnh khắc hù dọa khiến bạn không thể rời mắt khỏi màn hình.",
  },
  {
    id: 7,
    movieId: 107,
    startTime: new Date("2023-10-02T16:00:00"),
    endTime: new Date("2023-10-02T18:00:00"),
    isUsed: TicketStatus.NotUsed,
    description:
      "Hãy thưởng thức một câu chuyện hài hước đầy vui nhộn và thoải mái vào buổi chiều muộn, làm tan biến mọi mệt mỏi trong ngày.",
  },
  {
    id: 8,
    movieId: 108,
    startTime: new Date("2023-10-02T19:00:00"),
    endTime: new Date("2023-10-02T21:00:00"),
    isUsed: TicketStatus.Used,
    description:
      "Bạn đã chìm đắm trong một bộ phim khoa học viễn tưởng hấp dẫn. Hiệu ứng đặc biệt và nội dung sâu sắc làm nên buổi tối đáng nhớ.",
  },
  {
    id: 9,
    movieId: 109,
    startTime: new Date("2023-10-03T10:00:00"),
    endTime: new Date("2023-10-03T12:00:00"),
    isUsed: TicketStatus.NotUsed,
    description:
      "Hãy sẵn sàng cho một buổi sáng đầy tiếng cười với bộ phim hài hước nhẹ nhàng. Một khởi đầu hoàn hảo cho ngày mới.",
  },
  {
    id: 10,
    movieId: 110,
    startTime: new Date("2023-10-03T13:00:00"),
    endTime: new Date("2023-10-03T15:00:00"),
    isUsed: TicketStatus.NotUsed,
    description:
      "Chiều nay, hãy bước vào thế giới phiêu lưu kỳ thú với những nhân vật đầy sắc thái và câu chuyện gây tò mò từ đầu đến cuối.",
  },
];

export default dataTicketSamples;
