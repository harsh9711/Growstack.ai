"use client";

import { SettingsIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import BulkActionsTable from "./components/BulkActionsTable";
import CompanyTable from "./components/CompanyTable";
import ContactsTable from "./components/ContactsTable";
import RestoreTable from "./components/RestoreTable";
import TasksTable from "./components/TasksTable";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import Modal from "./components/modal";
import AddContact from "./components/modal/addContact";
import DeleteContact from "./components/modal/deleteContact";
import { ModalContent } from "./components/modal/modalEnums";
import SendSMS from "./components/modal/sendSMS";
import SendEmail from "./components/modal/sendEmail";
import { PaginationState } from "@tanstack/react-table";
import { Contact } from "@/types/contacts";
import instance from "@/config/axios.config";
import ProspectsTable from "./components/ProspectsTable";
import { useRouter, useSearchParams } from "next/navigation";

export default function ContactsDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabQueryParam = searchParams.get("tab");

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getContacts = async () => {
    setLoading(true);
    const response = await instance.get(
      `/users/api/v1/contacts?page=${pagination.pageIndex}&limit=${pagination.pageSize}`
    );
    setLoading(false);
    const data = response.data.data.contacts;

    const formattedContacts = data.map((item: any) => ({
      id: item.contacts._id,
      name: `${item.contacts.first_name} ${item.contacts.last_name}`,
      email: item.contacts.emails,
      phones: item.contacts.phones,
      logo: item.contacts.logo,
      created_on: item.contacts.createdAt,
      contact_type: item.contacts.contact_type,
      time_zone: item.contacts.time_zone,
    }));

    setContacts(formattedContacts);
  };

  useEffect(() => {
    getContacts();
  }, [pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    const tab = tabQueryParam ? Number(tabQueryParam) : 0;
    setSelectedTabIndex(tab);
    const totalTabs = tabs.length;
    const percentage = (tab / totalTabs) * 100;
    setTabUnderlineLeft(percentage);
  }, [tabQueryParam]);

  const tabs = ["Smart list", "Prospects", "Restore"];

  const handleModal = (value: ModalContent | null) => {
    setModalContent(value);
  };

  const handleTabClick = (index: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", index.toString());
    router.push(`?${params.toString()}`);
  };

  const renderContent = (selectedTabIndex: number) => {
    switch (selectedTabIndex) {
      case 0:
        return (
          <ContactsTable
            setToggleModal={setToggleModal}
            handleModal={handleModal}
            setSelectedIds={setSelectedIds}
            contacts={contacts}
            pagination={pagination}
            setPagination={setPagination}
            loading={loading}
          />
        );
      case 1:
        return <ProspectsTable />;
      case 2:
        return <RestoreTable />;
      // case 3:
      //   return <TasksTable />;
      // case 4:
      //   return <CompanyTable />;
    }
  };
  const renderTitle = (selectedTabIndex: number) => {
    switch (selectedTabIndex) {
      case 0:
        return (
          <Fragment>
            <h1 className="text-2xl font-semibold">All contacts</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam
              ultricies accumsan. Nec.{" "}
            </p>
          </Fragment>
        );
      case 1:
        return (
          <Fragment>
            <h1 className="text-2xl font-semibold">Prospects</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam
              ultricies accumsan. Nec.{" "}
            </p>
          </Fragment>
        );
      case 2:
        return (
          <Fragment>
            <h1 className="text-2xl font-semibold">Restored</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam
              ultricies accumsan. Nec.{" "}
            </p>
          </Fragment>
        );
      // case 3:
      //   return (
      //     <Fragment>
      //       <h1 className="text-2xl font-semibold">Tasks list</h1>
      //       <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
      //         Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam
      //         ultricies accumsan. Nec.{" "}
      //       </p>
      //     </Fragment>
      //   );
      // case 4:
      //   return (
      //     <Fragment>
      //       <h1 className="text-2xl font-semibold">Company</h1>
      //       <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
      //         Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam
      //         ultricies accumsan. Nec.{" "}
      //       </p>
      //     </Fragment>
      //   );
    }
  };

  return (
    <Fragment>
      {toggleModal && (
        <Modal setToggleModal={setToggleModal}>
          {modalContent === ModalContent.ADD_CONTACT && (
            <AddContact
              setToggleModal={setToggleModal}
              handleModal={handleModal}
              getContacts={getContacts}
            />
          )}
          {modalContent === ModalContent.DELETE_CONTACT && (
            <DeleteContact
              setToggleModal={setToggleModal}
              handleModal={handleModal}
              selectedIds={selectedIds}
              getContacts={getContacts}
            />
          )}
          {modalContent === ModalContent.SEND_SMS && (
            <SendSMS
              setToggleModal={setToggleModal}
              handleModal={handleModal}
              selectedIds={selectedIds}
            />
          )}
          {modalContent === ModalContent.SEND_EMAIL && (
            <SendEmail
              setToggleModal={setToggleModal}
              handleModal={handleModal}
              selectedIds={selectedIds}
              contacts={contacts}
            />
          )}
        </Modal>
      )}

      <main className="">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            {renderTitle(selectedTabIndex)}
          </div>
          <div className="w-full flex items-center justify-end gap-3">
            <div className="w-full max-w-[620px] bg-white shadow-2xl shadow-gray-200 px-3 py-2 rounded-xl">
              <div className="w-full flex relative">
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className={`w-full h-[48px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                      selectedTabIndex === index
                        ? "!text-white"
                        : "!text-primary-grey"
                    }`}
                    onClick={() => handleTabClick(index)}
                  >
                    {tab}
                  </div>
                ))}

                <div
                  className="absolute bottom-0 h-[48px] bg-primary-green custom-transition rounded-lg"
                  style={{
                    left: `calc(${tabUnderlineLeft}%)`,
                    width: `${100 / tabs.length}%`,
                  }}
                ></div>
              </div>
            </div>
            <Link href="/app/plan/contacts/settings">
              <button className="border Fborder-[#EBEBEB] rounded-lg p-3 hover:bg-primary-light-gray text-primary-black">
                <SettingsIcon size={20} />
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-5">{renderContent(selectedTabIndex)}</div>
      </main>
    </Fragment>
  );
}
