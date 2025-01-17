import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, expect, test, describe, beforeEach } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

import Page from "@/app/beneficiary/[id]/(profile)/(person-data)/page";

const server = setupServer(
  http.get(/\/api\/persons\/([^\/]+)/, ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      id: 14,
      first_name: "Johni",
      second_name: "algo",
      last_name: "Mamani",
      mothers_last_name: null,
      identity_card: "123456789",
      due_date: null,
      is_duedate_undefined: false,
      gender: "M",
      civil_status: "S",
      birth_date: "1989-12-31",
      death_certificate: null,
      death_certificate_number: "1234567890",
      reason_death: null,
      phone_number: 1234567890,
      nua: null,
      account_number: null,
      sigep_status: null,
      id_person_senasir: null,
      date_last_contribution: null,
    });
  }),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe("Page Beneficiary", () => {
  afterEach(cleanup);
  beforeEach(() => {
    render(<Page />);
  });
  describe("Render component view beneficiary", () => {
    test("should show text", async () => {
      await waitFor(() => {
        const identityCard = screen.getAllByTestId("ci");

        expect(identityCard.length).toBeGreaterThan(0);
      });
      const ci = await screen.findByText("123456789");

      expect(ci).toBeDefined();
    });
    test("Should show general person data", () => {
      const sectionGeneralPersonData = screen.getByText("Datos generales de la persona");

      expect(sectionGeneralPersonData).toBeDefined();
    });
    test("Should show general police data", () => {
      const sectionGeneralPoliceData = screen.getByText("Datos especificos de policía");

      expect(sectionGeneralPoliceData).toBeDefined();
    });
    test("Should show beneficiaries list", () => {
      const sectionBeneficiariesList = screen.getByText("Listado de los beneficiarios");

      expect(sectionBeneficiariesList).toBeDefined();
    });
    test("Should show contributions list", () => {
      const sectionContributions = screen.getByText("APORTES");

      expect(sectionContributions).toBeDefined();
    });
  });
});
