import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export interface Customer {
  iD_Customer: number;
  Customer_Salutation: string;
  Customer_FirstName: string;
  Customer_LastName: string;
  Customer_JobTitle: string;
  Customer_Organization: string;
  Customer_Email: string;
  Customer_Phone: string;
  Customer_Fax: string;
  Customer_Address1: string;
  Customer_Address2: string;
  Customer_City: string;
  Customer_Zip: string;
  Customer_State: string;
  Customer_Country: string;
  Customer_Notes: string;
  Customer_IsAcceptingMail: boolean;
  Customer_IsRegistered: boolean;
  Customer_IsBlacklisted: boolean;
  Customer_DateEdit: string; // ISO date string format from JSON (e.g. "2024-01-01T00:00:00")
}

export interface Product {
  iD_Product: number;
  Product_LicenseHash: string;
  Product_TrialHash: string;
  Product_PasswordHash: string;
  Product_InputFilename: string;
  Product_OutputFilename: string;
  Product_Type?: number;
  product_Name: string;
  Product_Version: string;
  Product_Description: string;
  Product_Icon: Uint8Array | string; // Use Uint8Array for binary data or string if base64
  Product_UnitPrice?: number;
  Product_ShippingFee?: number;
  Product_ServiceFee?: number;
  product_CustomInfo: ProductCustomInfo;
  Product_InvoiceTemplatePath: string;
  Product_Notes: string;
  Product_KeyGenDLL: string;
  Product_KeyGenFunction: string;
}

export interface ProductCustomInfo {
  defaultActivationSimultaneousDevices: number;
  defaultRegistrationType: string;
  defaultActivationLimitActivation: number;
  defaultActivationLimitDeactivation: number;
  defaultActivationMaxDifferentDevices: number;
  defaultActivationFormat: string;
  openFolderWhenGeneratingLicense: boolean;
  autoGenerateInFolder: boolean;
  licenseFileBinaryName: string;
  licenseFileTextName: string;
  licenseRegistryHive: string;
  licenseRegistryName: string;
  generateLicensesInFolder: string;
  licenseRegistryValueName: string;
}

export interface Order {
  iD_Order: number;
  product: Product;
  order_RegistrationContent: ParsedLicense;
}

export interface ParsedLicense {
  userName: string;
  hardwareId: string;
  daysExpiration: number;
  licenseFormat: string;
  licenseDataBase64: string;
  company: string;
}


@Injectable({
  providedIn: 'root' // makes this service injectable app-wide
})
export class CustomerService {
  private readonly apiUrl = `${environment.apiBaseUrl}/customers`;
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/getCustomers`);
  }

  getCustomerOrders(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/getCustomerOrders?customerId=${customerId}`);
  }
}