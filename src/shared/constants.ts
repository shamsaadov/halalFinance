import { Document, Footer, Header, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

interface FormData {
  fullName: string;
  age: string;
  phone: string;
  passportSeries: string;
  passportNumber: string;
  residence: string;
}

export const generateDocx = (formData: FormData, onClose: () => void) => {
  const doc = new Document({
    creator: "Forsa-Finance",
    title: "Договор исламской рассрочки",
    styles: {
      default: {
        heading1: {
          run: {
            font: "Times New Roman",
            size: 36,
            bold: true,
            color: "2B579A",
          },
          paragraph: {
            alignment: "center",
            spacing: { after: 400, before: 250 },
          },
        },
        heading2: {
          run: {
            font: "Times New Roman",
            size: 28,
            bold: true,
            color: "4A4A4A",
            underline: {},
          },
          paragraph: {
            spacing: { before: 300, after: 200 },
          },
        },
      },
      paragraphStyles: [
        {
          id: "normal",
          name: "Normal",
          run: {
            font: "Times New Roman",
            size: 24,
            color: "333333",
          },
          paragraph: {
            spacing: { line: 320, before: 120, after: 120 },
          },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1134, bottom: 1134, left: 1701, right: 1134 },
            borders: {
              pageBorderTop: { style: "single", size: 3, color: "A6A6A6" },
              pageBorderBottom: { style: "single", size: 3, color: "A6A6A6" },
              pageBorderLeft: { style: "single", size: 3, color: "A6A6A6" },
              pageBorderRight: { style: "single", size: 3, color: "A6A6A6" },
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Forsa Finance",
                    size: 22,
                    color: "666666",
                    italics: true,
                  }),
                ],
                alignment: "right",
                spacing: { after: 100 },
              }),
            ],
          }),
        },
        //footers: {
        //  default: new Footer({
        //    children: [
        //      new Paragraph({
        //        children: [
        //          new TextRun("Страница "),
        //          // @ts-ignore
        //          new TextRun({ children: ["PAGE"], field: "PAGE" }),
        //          new TextRun(" из "),
        //          // @ts-ignore
        //          new TextRun({ children: ["NUMPAGES"], field: "NUMPAGES" }),
        //        ],
        //        alignment: "center",
        //        spacing: { after: 100 },
        //      }),
        //    ],
        //  }),
        //},
        children: [
          new Paragraph({
            text: "ДОГОВОР ИСЛАМСКОЙ РАССРОЧКИ",
            heading: "Heading1",
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "г. Грозный",
                size: 20,
                italics: true,
              }),
              new TextRun({
                text: `                                                                 ${new Date().toLocaleDateString("ru-RU")}`,
                size: 20,
                italics: true,
              }),
            ],
            alignment: "both",
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: "Личные данные клиента",
            heading: "Heading2",
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `ФИО: ${formData.fullName}`,
              }),
            ],
            style: "normal",
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Возраст: ${formData.age}`,
              }),
            ],
            style: "normal",
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Телефон: ${formData.phone}`,
              }),
            ],
            style: "normal",
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Паспортные данные: ${formData.passportSeries} ${formData.passportNumber}`,
              }),
            ],
            style: "normal",
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Место проживания: ${formData.residence}`,
              }),
            ],
            style: "normal",
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: "Условия договора",
            heading: "Heading2",
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: "1. Настоящий договор регулирует отношения между сторонами в соответствии с принципами исламского финансирования (мурабаха).\n\n2. Стороны обязуются соблюдать условия рассрочки без применения процентов, в соответствии с нормами шариата.\n\n3. Компания гарантирует конфиденциальность данных клиента.",
            style: "normal",
          }),
          new Paragraph({
            text: "Подписи сторон:",
            heading: "Heading2",
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            text: "Клиент: ___________________________",
            alignment: "left",
            spacing: { after: 400 },
          }),
          new Paragraph({
            text: "Представитель компании: ___________________________",
            alignment: "left",
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "Договор_исламской_рассрочки.docx");
    onClose();
  });
};

export const formatter = new Intl.NumberFormat("ru-RU");
