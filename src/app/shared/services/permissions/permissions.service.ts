import { Injectable } from "@angular/core";

import { Role } from 'app/shared/enums/role';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  internalRoles: string[] = [
    Role.SuperAdmin,
    Role.CustomerSVC,
    Role.CustomerSvcMgr,
    Role.CustomerServiceExt,
    Role.Finance,
    Role.ExecDirector,
    Role.Marketing,
  ];

  externalRoles: string[] = [
    Role.Carrier,
    Role.BIC,
    Role.RailInc,
    Role.Border,
    Role.Reseller,
    Role.UIIA,
  ];

  hasInternalAccess(role: string): boolean {
    return role === Role.SuperAdmin || role === Role.CustomerSVC || role === Role.CustomerSvcMgr || role === Role.CustomerServiceExt || role === Role.Marketing || role === Role.Finance || role === Role.ExecDirector;
  }

  hasCustomerAccess(role: string): boolean {
    return role === Role.Carrier;
  }

  hasFinanceAccess(role: string): boolean {
    return role === Role.Finance || role === Role.CustomerSvcMgr || role === Role.ExecDirector || role === Role.SuperAdmin;
  }

  hasManageAccountsAccess(role: string): boolean {
    return role === Role.SuperAdmin || role === Role.CustomerSVC || role === Role.Reseller || role === Role.CustomerServiceExt || role === Role.CustomerSvcMgr || role === Role.BIC || role === Role.RailInc;
  }

  hasCustomerSvcMgrAccess(role: string): boolean {
    return role === Role.SuperAdmin || role === Role.CustomerSvcMgr;
  }

  hasBusinessAccess(role: string): boolean {
    return role === Role.SuperAdmin || role === Role.Marketing || role === Role.ExecDirector || role === Role.Finance;
  }

  hasMarketingOrDirAccess(role: string): boolean {
    return role === Role.SuperAdmin || role === Role.Marketing || role === Role.ExecDirector;
  }

  hasCustomerSvcAccess(role: string): boolean {
    return role === Role.SuperAdmin || role === Role.CustomerServiceExt || role === Role.CustomerSVC || role === Role.CustomerSvcMgr;
  }

  hasCustomerSvcNoExt(role: string): boolean {
    return role === Role.CustomerSVC || role === Role.CustomerSvcMgr;
  }

  hasCustomerSvcNoMgr(role: string): boolean {
    return role === Role.CustomerSVC || role === Role.CustomerServiceExt;
  }

  hasResellerAccess(role: string): boolean {
    return role === Role.Reseller;
  }

  hasMgrAccess(role: string): boolean {
    return role === Role.SuperAdmin || role === Role.CustomerSvcMgr;
  }

  hasExternalAccess(role: string): boolean {
    return role === Role.SuperAdmin || role === Role.Carrier || role === Role.Reseller || role === Role.BIC || role === Role.RailInc || role === Role.Border;
  }

  hasOfficialsAccess(role: string): boolean {
    return role === Role.SuperAdmin || role === Role.BIC || role === Role.RailInc || role === Role.UIIA || role === Role.Border;
  }

  hasReservedAccess(role: string): boolean {
    return role === Role.SuperAdmin || role === Role.BIC || role === Role.RailInc || role === Role.UIIA;
  }

  hasCCPRRRAccess(role: string): boolean {
    return role === Role.SuperAdmin || role === Role.Carrier || role === Role.Reseller;
  }

  hasBorderAccess(role: string): boolean {
    return role === Role.SuperAdmin || role === Role.Border;
  }

  hasCCPAccess(role: string): boolean {
    return role === Role.SuperAdmin || role === Role.Carrier;
  }

  hasRRRAccess(role: string): boolean {
    return role === Role.SuperAdmin || role === Role.Reseller;
  }

  hasMarketingAccess(role: string): boolean {
    return role === Role.Marketing;
  }

  hasPartnerCodeAccess(role: string): boolean {
    return role === Role.BIC || role === Role.RailInc || role === Role.UIIA;
  }

  hasBicRailAccess(role: string): boolean {
    return role === Role.BIC || role === Role.RailInc;
  }

  hasRefundAccess(role: string): boolean {
    return role === Role.SuperAdmin || role === Role.CustomerSVC || role === Role.CustomerSvcMgr;
  }

  hasManageAccountsHome(role: string): boolean {
    return role === Role.SuperAdmin || role === Role.CustomerSVC || role === Role.CustomerSvcMgr || role === Role.CustomerServiceExt || role === Role.Reseller || role === Role.BIC || role === Role.RailInc || role === Role.UIIA;
  }
}
