package curam.molsa.core.facade.impl;

import curam.codetable.COMMUNICATIONFORMAT;
import curam.core.facade.fact.ParticipantFactory;
import curam.core.facade.struct.CreateProFormaCommDetails1;
import curam.core.facade.struct.FileNameAndDataDtls;
import curam.core.facade.struct.ReadAttachmentKey;
import curam.core.facade.struct.ReadCommunicationAttachmentDetails;
import curam.core.fact.CommAttachmentLinkFactory;
import curam.core.fact.ConcernRoleCommunicationFactory;
import curam.core.intf.CommAttachmentLink;
import curam.core.intf.ConcernRoleCommunication;
import curam.core.sl.struct.CommunicationIDKey;
import curam.core.sl.struct.PreviewProFormaKey;
import curam.core.sl.struct.ProFormaReturnDocDetails;
import curam.core.struct.CommunicationAttachmentLinkReadmultiKey;
import curam.core.struct.ConcernRoleCommunicationDtls;
import curam.core.struct.ConcernRoleCommunicationKey;
import curam.molsa.core.sl.fact.MOLSACommunicationDAFactory;
import curam.util.exception.AppException;
import curam.util.exception.InformationalException;

	
	
	public class MOLSACommunicationDA extends
	curam.molsa.core.facade.base.MOLSACommunicationDA{

		@Override
		public void createProForma1(CreateProFormaCommDetails1 dtls)
		throws AppException, InformationalException {
			// TODO Auto-generated method stub
			curam.molsa.core.sl.intf.MOLSACommunicationDA communicationObj= MOLSACommunicationDAFactory.newInstance();
			communicationObj.createProForma1(dtls.dtls);
		}
		// END, CR00262895

		// BEGIN, CR00246099, AK
		/**
		 * Returns the file content and the file name of the communication that has 
		 * to be opened or previewed.
		 *
		 * @param CommunicationIDKey Contains the Communication ID.
		 *
		 * @return FileNameAndDataDtls the name and the content of the file.
		 *
		 * @throws InformationalException Generic Exception Signature.
		 * @throws AppException Generic Exception Signature.
		 */
		public FileNameAndDataDtls printCommunication(
				final CommunicationIDKey communicationIDKey)
		throws AppException, InformationalException {
			final FileNameAndDataDtls fileNameAndDataDtls = new FileNameAndDataDtls();
		//	final curam.core.sl.intf.Communication communicationObj = CommunicationFactory.newInstance();
			final curam.molsa.core.sl.intf.MOLSACommunicationDA communicationObj=MOLSACommunicationDAFactory.newInstance();
			final ConcernRoleCommunication concernRoleCommunicationObj = ConcernRoleCommunicationFactory.newInstance();
			final ConcernRoleCommunicationKey key = new ConcernRoleCommunicationKey();

			key.communicationID = communicationIDKey.communicationID;
			final ConcernRoleCommunicationDtls communicationDetails = concernRoleCommunicationObj.read(
					key);

			if (COMMUNICATIONFORMAT.PROFORMA.equals(
					communicationDetails.communicationFormat)) {

				final PreviewProFormaKey previewProFormaKey = new PreviewProFormaKey();

				previewProFormaKey.communicationID = communicationIDKey.communicationID;
				final ProFormaReturnDocDetails proformaDetails = communicationObj.previewProForma(
						previewProFormaKey);

				fileNameAndDataDtls.fileContent = proformaDetails.fileDate;
				fileNameAndDataDtls.fileName = proformaDetails.fileName;

			} else if (COMMUNICATIONFORMAT.MSWORD.equals(
					communicationDetails.communicationFormat)) {

				final CommAttachmentLink commAttachmentLinkObj = CommAttachmentLinkFactory.newInstance();
				final CommunicationAttachmentLinkReadmultiKey rmkey = new CommunicationAttachmentLinkReadmultiKey();

				rmkey.communicationID = communicationIDKey.communicationID;
				final ReadAttachmentKey readAttachmentKey = new ReadAttachmentKey();

				readAttachmentKey.readAttachmentIn.attachmentID = commAttachmentLinkObj.searchByCommunication(rmkey).dtls.item(0).attachmentID;
				final ReadCommunicationAttachmentDetails attachmentDetails = ParticipantFactory.newInstance().readCommunicationAttachment(
						readAttachmentKey);

				fileNameAndDataDtls.fileContent = attachmentDetails.readCommunicationAttachmentDtls.attachmentContents;
				fileNameAndDataDtls.fileName = attachmentDetails.readCommunicationAttachmentDtls.attachmentName;     
			}
			return fileNameAndDataDtls;
		}
	}


