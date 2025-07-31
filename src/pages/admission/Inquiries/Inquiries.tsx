import InquiryList from "./InquiriesList";

const response = {
  success: true,
  data: [
    {
      status: "pending",
      _id: "688b4606a7a5034eb44ebcfe",
      name: "John Doe",
      phone: "1234567890",
      email: "john.doe@example.com",
      courseInterest: "JEE",
      message: "I would like to know more about the JEE course.",
      followUps: [],
      createdAt: "2025-07-31T10:31:34.513Z",
      __v: 0,
    },
     {
      status: "pending",
      _id: "688b4606a7a5034eb44ebcfe",
      name: "John Doe",
      phone: "1234567890",
      email: "john.doe@example.com",
      courseInterest: "JEE",
      message: "I would like to know more about the JEE course.",
      followUps: [],
      createdAt: "2025-07-31T10:31:34.513Z",
      __v: 0,
    },
  ],
};

// ✅ Cast to match `Inquiry[]` interface
const castedInquiries = response.data as [];

const EnquiriesPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-brand-500">Admission Inquiries</h1>
      <InquiryList inquiries={castedInquiries} />
    </div>
  );
};

export default EnquiriesPage;
