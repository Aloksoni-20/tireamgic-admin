export const orders = [
  {
    id: "ORD-20261001",
    customer: {
      name: "Rahul Mehta",
      email: "rahul.mehta@example.com",
      phone: "+91 98765 11223",
    },

    partner: {
      id: "INS-1001",
      name: "Rahul Sharma",
      businessName: "Rahul Tyres",
      type: "Installer",
    },

    items: [
      {
        id: 1,
        name: "Michelin Primacy 4",
        sku: "MIC-PRI-4",
        quantity: 2,
        price: 8500,
        total: 17000,
      },
      {
        id: 2,
        name: "MRF Perfinza",
        sku: "MRF-PER-01",
        quantity: 1,
        price: 6200,
        total: 6200,
      },
    ],

    pricing: {
      subtotal: 23200,
      discount: 1200,
      shipping: 300,
      tax: 3960,
      grandTotal: 26260,
    },

    payment: {
      status: "Paid",
      method: "UPI",
      transactionId: "TXN-78293482",
    },

    orderStatus: "Processing",

    shippingAddress: {
      address: "123 MG Road",
      city: "Indore",
      state: "Madhya Pradesh",
      pincode: "452001",
    },

    createdAt: "09 Oct 2026, 10:32 AM",
  },

  {
    id: "ORD-20261002",
    customer: {
      name: "Amit Patel",
      email: "amit.patel@example.com",
      phone: "+91 98765 22334",
    },

    partner: {
      id: "INS-1002",
      name: "Amit Patel",
      businessName: "Patel Auto Care",
      type: "Installer",
    },

    items: [
      {
        id: 1,
        name: "Apollo Alnac 4G",
        sku: "APL-ALN-4G",
        quantity: 4,
        price: 7100,
        total: 28400,
      },
    ],

    pricing: {
      subtotal: 28400,
      discount: 1000,
      shipping: 0,
      tax: 4932,
      grandTotal: 32332,
    },

    payment: {
      status: "Paid",
      method: "Credit Card",
      transactionId: "TXN-78342112",
    },

    orderStatus: "Confirmed",

    shippingAddress: {
      address: "45 Arera Colony",
      city: "Bhopal",
      state: "Madhya Pradesh",
      pincode: "462016",
    },

    createdAt: "08 Oct 2026, 03:15 PM",
  },

  {
    id: "ORD-20261003",
    customer: {
      name: "Vikas Jain",
      email: "vikas.jain@example.com",
      phone: "+91 99887 44556",
    },

    partner: {
      id: "AFF-1001",
      name: "Vikas Jain",
      businessName: "Vikas Jain",
      type: "Affiliate",
    },

    items: [
      {
        id: 1,
        name: "CEAT SportDrive",
        sku: "CEAT-SPD-01",
        quantity: 2,
        price: 6800,
        total: 13600,
      },
      {
        id: 2,
        name: "JK Tyre UX Royale",
        sku: "JK-UXR-01",
        quantity: 2,
        price: 5900,
        total: 11800,
      },
    ],

    pricing: {
      subtotal: 25400,
      discount: 1500,
      shipping: 250,
      tax: 4329,
      grandTotal: 28479,
    },

    payment: {
      status: "Pending",
      method: "Cash on Delivery",
      transactionId: null,
    },

    orderStatus: "Pending",

    shippingAddress: {
      address: "78 Vijay Nagar",
      city: "Indore",
      state: "Madhya Pradesh",
      pincode: "452010",
    },

    createdAt: "08 Oct 2026, 11:45 AM",
  },

  {
    id: "ORD-20261004",
    customer: {
      name: "Mohit Singh",
      email: "mohit.singh@example.com",
      phone: "+91 98765 55667",
    },

    partner: {
      id: "INS-1003",
      name: "Mohit Singh",
      businessName: "Singh Wheel Care",
      type: "Installer",
    },

    items: [
      {
        id: 1,
        name: "Bridgestone Turanza",
        sku: "BRI-TUR-01",
        quantity: 4,
        price: 9200,
        total: 36800,
      },
    ],

    pricing: {
      subtotal: 36800,
      discount: 2500,
      shipping: 0,
      tax: 6174,
      grandTotal: 40474,
    },

    payment: {
      status: "Paid",
      method: "Net Banking",
      transactionId: "TXN-78451291",
    },

    orderStatus: "Delivered",

    shippingAddress: {
      address: "12 Freeganj",
      city: "Ujjain",
      state: "Madhya Pradesh",
      pincode: "456010",
    },

    createdAt: "07 Oct 2026, 09:20 AM",
  },

  {
    id: "ORD-20261005",
    customer: {
      name: "Karan Mehta",
      email: "karan.mehta@example.com",
      phone: "+91 98765 88990",
    },

    partner: {
      id: "AFF-1003",
      name: "Karan Mehta",
      businessName: "Karan Mehta",
      type: "Affiliate",
    },

    items: [
      {
        id: 1,
        name: "Goodyear Assurance",
        sku: "GOO-ASR-01",
        quantity: 2,
        price: 7600,
        total: 15200,
      },
    ],

    pricing: {
      subtotal: 15200,
      discount: 500,
      shipping: 200,
      tax: 2682,
      grandTotal: 17582,
    },

    payment: {
      status: "Failed",
      method: "Credit Card",
      transactionId: "TXN-FAILED-123",
    },

    orderStatus: "Cancelled",

    shippingAddress: {
      address: "22 Palasia",
      city: "Indore",
      state: "Madhya Pradesh",
      pincode: "452018",
    },

    createdAt: "05 Oct 2026, 04:10 PM",
  },
];